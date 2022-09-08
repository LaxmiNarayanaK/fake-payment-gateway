const fs = require('fs');
const path = require('path');
const mailService = require('../system/mailer/nodeMailer.service');

const emailCancelBooking = {
    sendMFAEmail : async ( customerName,senderEmail,amount, bookingDate,transactionId,paymentMethod,service) =>
    {
        try
        {
            console.log('Canellation Email send fired.');
            fs.readFile(path.resolve('public/cancelBooking.html'), 'utf8', (err, data) =>
            {
                if (err)
                {
                    // TODO: send telegram notification
                    console.log(err);
                    throw err;
                }

                const htmlBody = data.replace("{customerName}", customerName)
                .replace("{amount}", amount)
                .replace("{amount}", amount)
                .replace("{transactionId}", transactionId)
                .replace("{transactionId}", transactionId)
                .replace("{service}", service)
                .replace("{paymentMethod}", paymentMethod)
                .replace("{cancelDate}", new Date().toLocaleString())
                .replace("{date}", bookingDate);

                mailService.send(senderEmail, `PSTravel Booking Cancellation`, htmlBody).then();
            });
        }
        catch (e)
        {
            console.log(e);
        }
    },
};

module.exports = emailCancelBooking;
