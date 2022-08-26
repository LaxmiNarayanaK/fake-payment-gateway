const fs = require('fs');
const path = require('path');
const mailService = require('../system/mailer/nodeMailer.service');

const emailNotificationService = {
    sendMFAEmail : async ( customerName,senderEmail,amount, OTP) =>
    {
        try
        {
            console.log('Email send fired.');
            fs.readFile(path.resolve('public/emailMFA.html'), 'utf8', (err, data) =>
            {
                if (err)
                {
                    // TODO: send telegram notification
                    console.log(err);
                    throw err;
                }

                console.log( OTP);

                const htmlBody = data.replace("{customerName}", customerName)
                .replace("{amount}", amount)
                .replace("{otp}", OTP); 

                mailService.send(senderEmail, `PSTravel Payment Verification`, htmlBody).then();
            });
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
};

module.exports = emailNotificationService;
