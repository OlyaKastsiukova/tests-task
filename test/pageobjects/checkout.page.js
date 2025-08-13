const Page = require('./page');

class CheckoutPage extends Page {
    get firstNameInput() {
        return $('[data-test="firstName"]');
    }

    get lastNameInput() {
        return $('[data-test="lastName"]');
    }

    get checkoutStepTwoUrl() {
        return 'checkout-step-two.html';
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

    get thanksOrderText() {
        return 'Thank you for your order!';
    }

    open() {
        return super.open('cart.html');
    }

    extractPriceFromText(text) {
        const match = text.match(/\$\d+(\.\d{2})?/);
        return match ? match[0] : null;
    }

    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.setValue(this.firstNameInput, firstName);
        await this.setValue(this.lastNameInput, lastName);
        await this.setValue(this.postalCodeInput, postalCode);
    }

    async clickContinue() {
        await this.click(this.continueButton);
    }

    async clickFinish() {
        await this.click(this.finishButton);
    }

    async clickBackToProducts() {
        await this.click(this.backButton);
    }

    async getSubTotalText() {
        return await this.getText(this.subTotalLabel);
    }
}

module.exports = new CheckoutPage();
