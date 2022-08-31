const Router = require("koa-router");
const StatusCodes = require("http-status-codes");
const fs = require("fs");
const { Card, Response } = require('../../../types');
const { emailConfirmationService } = require('../../../services')
const path = require('path');


const router = new Router({
    prefix: "/api/v1/payment/Verify",
});
router.post("/", async (ctx, next) => {


    var data = fs.readFileSync(path.resolve('data/card-phone-transaction.json'));
    const obj = JSON.parse(data)
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
                    element.orderID
                );
                next().then();
                return;
            }
        }
    });
});

module.exports = router;
