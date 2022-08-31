const fs = require('fs');
const path = require('path');
const mailService = require('../system/mailer/nodeMailer.service');

const ConfirmationService = {
    sendReceiptEmail : async ( senderEmail, customerName, service, total, orderID) =>
    {
        try
        {
            console.log('Email send fired.');
            fs.readFile(path.resolve('public/Confirmation.html'), 'utf8', (err, data) =>
            {
                if (err)
                {
                    // TODO: send telegram notification
                    console.log(err);
                    throw err;
                }
                let names = service.names;
                let prices = service.prices;
                var priceRow ="";
                for(let i=0;i<names.length;i++){
                    priceRow += `<tr>
                    <td><a style="font-weight: 700; text-decoration: none; color: #000;">${names[i]}</a></td>
                    <td class="alignright">
                      Rs.${prices[i]}
                    </td>
                  </tr>`
                }
                const htmlBody = data.replace("{customerName}", customerName)
                    .replace("{invoiceNumber}", Math.floor(Math.random() * Math.floor(Math.random() * Date.now())))
                    .replace("{date}", new Date().toLocaleString())
                    .replace("{service}", priceRow)
                    .replace("{total}", total)
                    .replace("{orderID}",orderID)

                mailService.send(senderEmail, `PSTravel E-Receipt`, htmlBody).then();
            });
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
};

module.exports = ConfirmationService;