const Router = require('koa-router');
const StatusCodes = require('http-status-codes');
const { PhonePayment, emailNotificationService } = require('../../../services');
const { Phone, Response } = require('../../../types');

// Prefix all routes with: /auth
const router = new Router({
    prefix : '/api/v1/payment/phone',
});

router.get('/', async (ctx, next) =>
{
    const response = new Response();

    const data = await PhonePayment.history();

    response.success = true;
    response.message = `Transaction history.`;
    response.data = {
        data,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;

    next().then();
});

router.post('/', async (ctx, next) =>
{
    var oID = new Date().getTime();
    var oTP = Math.floor(100000 + Math.random() * 900000);
    ctx.request.body["orderID"] = oID;
    ctx.request.body["OTP"] = oTP;

    const request = Object.setPrototypeOf(ctx.request.body, Phone.prototype);
    const response = new Response();

    if (!request.isValid())
    {
        ctx.response.status = StatusCodes.BAD_REQUEST;
        response.success = false;
        response.message = "required field(s) missing";
        response.data = {
            message : "required field(s) missing",
        };
        next().then();

        ctx.body = response;

        return;
    }

    const data = await PhonePayment.payment(request);

    if (!data)
    {
        ctx.response.status = StatusCodes.FORBIDDEN;

        response.success = false;
        response.message = "Cannot proceed payment.";
        response.data = {
            message : data,
        };

        ctx.body = response;
        next().then();

        return;
    }
    await emailNotificationService.sendMFAEmail(
        request.customerName,
        request.customerEmail,
        request.amount,
        request.OTP = oTP,
    );


    response.success = true;
    response.message = `Verify Transaction.`;
    response.orderID = oID;
    response.data = {
        message: `Verify Transaction`,
    };
    ctx.response.status = StatusCodes.OK;
    ctx.body = response;

    next().then();
});

module.exports = router;
