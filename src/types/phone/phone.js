/**
 *             'app_name'            => 'ABC',
 *             'customerEmail'      => 'john@gmail.com',
 *             'service'             => 'Electronic Items',
 *             'phoneNumber'        => '0771234567',
 *             'phone_holder_name'   => 'Example',
 *             'amount'              => '5000.00',
 *             'currency'            => 'USD',
 */

function Phone()
{
    this.service = {};
    this.customerEmail = '';
    this.phoneNumber = '';
    this.customerName = '';
    this.amount = '';
    this.upiID = '';
}

Phone.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = Phone;
