/**
 *             'app_name'            => 'ABC',
 *             'customerEmail'      => 'john@gmail.com',
 *             'service'             => 'Electronic Items',
 *             'cardType'           => 'VISA',
 *             'card_holder_name'    => 'Example',
 *             'cardNumber'         => '4242424242424242',
 *             'expiryMonth'         => '01',
 *             'expiryYear'          => '2020',
 *             'cvv'                 => '123',
 *             'amount'              => '5000.00',
 *             'currency'            => 'USD',
 */

function Card()
{
    this.service = {};
    this.customerEmail = '';
    this.cardType = '';
    this.customerName = '';
    this.cardNumber = '';
    this.expiryMonth = '';
    this.expiryYear = '';
    this.cvv = '';
    this.amount = '';
    this.orderID = '';
    this.OTP= '';

}

Card.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = Card;
