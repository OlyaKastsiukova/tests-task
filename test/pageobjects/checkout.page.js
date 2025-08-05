const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage extends Page {
    /**
     * define selectors using getter methods
     */
    get firstNameInput() {
        return $('[data-test="firstName"]');
    }
    get lastNameInput() {
        return $('[data-test="lastName"]');
    }
    get postalCodeInput() {
        return $('[data-test="postalCode"]');
    }
    get continueButton() {
        return $('[data-test="continue"]');
    }
    get completeHeader() {
        return $('[data-test="complete-header"]');
    }
    get finishButton() {
        return $('[data-test="finish"]');
    }
    get backButton() {
        return $('[data-test="back-to-products"]');
    }
    get subTotalLabel() {
        return $('[data-test="subtotal-label"]');
    }
    get error() {
        return $('[data-test="checkout-info-container"] [data-test="error"]');
    }
}

module.exports = new CheckoutPage();
