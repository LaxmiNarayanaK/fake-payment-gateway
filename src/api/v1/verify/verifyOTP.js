const Router = require("koa-router");
const StatusCodes = require("http-status-codes");
const fs = require("fs");
const { Card, Response } = require('../../../types');
const fetch = require('node-fetch');
const { emailConfirmationService } = require('../../../services')


const router = new Router({
    prefix: "/api/v1/payment/Verify",
});
router.post("/", async (ctx, next) => {

    if(ctx.request.body.upiID)
    var data = fs.readFileSync('data\\phone-transaction.json');
    else
    var data = fs.readFileSync('data\\card-transaction.json');

    const obj = JSON.parse(data)
    console.log(obj)
    const response = new Response();
    users = obj;
    users.forEach((element) => {
        if (element.orderID == ctx.request.body.orderID) {
            if (element.OTP == ctx.request.body.OTP) {

                response.success = true;
                response.message = `Transaction is successful.`;
                response.transactionID = new Date().getTime();
                response.data = {

                };
                ctx.response.status = StatusCodes.OK;
                ctx.body = response;
                emailConfirmationService.sendReceiptEmail(
                    element.customerEmail,
                    element.customerName,
                    element.service,
                    element.amount,
                );
                next().then();
                return;
            }
        }
    });
    ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot proceed payment.";
        response.data = {
            message : "Invalid OTP",
        };

        ctx.body = response;
        next().then();

        return;
});

module.exports = router;
