const Router = require("koa-router");
const StatusCodes = require("http-status-codes");
const { emailCancelBooking } = require('../../../services')


const router = new Router({
    prefix: "/api/v1/payment/cancel",
});
router.post("/", async (ctx, next) => {
                ctx.response.status = StatusCodes.OK;
           
                emailCancelBooking.sendMFAEmail(
                    ctx.request.body.customerName,
                    ctx.request.body.customerEmail,
                    ctx.request.body.amount,
                    ctx.request.body.bookingDate,
                    ctx.request.body.transactionId,
                    ctx.request.body.paymentMethod,
                    ctx.request.body.service,
                );
                next().then();
                return;
            });

module.exports = router;
