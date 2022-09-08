# fake-payment-gateway

## Dummy payment gateway for testng purposes. Can pay using card details as well as using the phone number.

fake-payment-gateway, that handle

- Payment via card details
- Payment via phone number
- each payment send email notification for customer
- OTP functionality to verify payment


## Tech

---

fake-payment-gateway uses:

- [JavaScript]
- [NodeJS]
- [KoaJS]

## Installation

1. download the project.
   
   ```bash
   git@github.com:ShalithaCell/fake-payment-gateway.git
   ```
    or
    
    ```bash
    https://github.com/ShalithaCell/fake-payment-gateway.git
    ```
   
 2. Goto inside to '_fake-payment-gateway_' folder and run the command.
  
    ```bash
     npm install
    ```
 3. Configure email sender
     * create .env file in project root folder. execute following command,
     
        In windows
        ```
       cd > .env
       ```
       In Mac/ Linux
       ```
        touch .env
       ```
     * add following code to the .env file with your email address credentials,
     
       ```
       MAIL_SENDER_IDENTITY="please enter your email address here"
       MAIL_SENDER_PASSWORD="please enter your email password here"
       ```
       
     * make sure you should enable, less secure apps in gmail account.
                      * [How to enable less secure apps](https://support.google.com/a/answer/6260879?hl=en)
                      
4. Run the Project
   
   ```bash
   npm run start
   ```     
---

## How to use

- [x] Before integration the fake-payment gateway, please simulate the api end-points using the postman. 
You can find the Postman collection inside the **_doc_** folder.


You can get all api end-points invoking the following link,
* [http://localhost:5100/api/](http://localhost:5100/api/)

1. For card payment 
    - url  : [http://localhost:5100/api/v1/payment/card](http://localhost:5100/api/v1/payment/card)
    - type : POST

2. For payment using phone number
    - url  : [http://localhost:5100/api/v1/payment/phone](http://localhost:5100/api/v1/payment/phone)
    - type : POST

3. Get card payment transaction history
    - url  : [http://localhost:5100/api/v1/payment/card](http://localhost:5100/api/v1/payment/card)
    - type : GET
   
3. Get phone payment transaction history
    - url  : [http://localhost:5100/api/v1/payment/phone](http://localhost:5100/api/v1/payment/phone)
    - type : GET
    
---

## Development

---

Want to contribute? Great!

 * I'm here for your pull-request.

 The best way to contribute is by spreading the word about the library:
 
 * Blog it
 * Comment it
 * Fork it
 * Star it
 * Share it

## License

---

MIT

**Free Software, Hell Yeah!**

[javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/
[nodejs]: https://nodejs.org/en/
[koajs]: https://koajs.com/
