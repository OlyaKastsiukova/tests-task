const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const ProductPage = require('../pageobjects/product.page')
const CheckoutPage = require('../pageobjects/checkout.page')

let selectedPrice;
const ELEMENT_INDEX_TO_ADD = 1;
let selectedItemTitleLink;

describe('Valid Checkout Flow', () => {
    it('should show error when logging in without credentials', async () => {
        await LoginPage.open();
        await LoginPage.submitButton.click();
        await expect(await LoginPage.error).toExist();
    })
    it('should log in successfully', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(ProductPage.inventoryContainer).toExist();
    })
    it('should add product to cart and store price', async () => {
        await ProductPage.getAddToCartButton(ELEMENT_INDEX_TO_ADD).click();
        await expect(ProductPage.shoppingCartBadge).toHaveText('1');
        selectedPrice = await ProductPage.getPrice(ELEMENT_INDEX_TO_ADD).getText();
    })
    it('should navigate to cart and verify product', async () => {
        selectedItemTitleLink = await ProductPage.getSelectedItemTitleAttr(ELEMENT_INDEX_TO_ADD);
        await ProductPage.shoppingCart.click();
        const selectedItem = await CheckoutPage.getElementByDataTest(selectedItemTitleLink);
        await expect(selectedItem).toExist();
    })
    it('should open checkout form', async () => {
        await ProductPage.checkoutButton.click();
        await expect(await CheckoutPage.firstNameInput).toExist();
    })
    it('should show validation error when checkout fields are empty', async () => {
        await CheckoutPage.continueButton.click();
        await expect(await CheckoutPage.error).toExist();
    })
    it('should fill out and submit checkout form', async () => {
        await CheckoutPage.firstNameInput.setValue('First');
        await CheckoutPage.lastNameInput.setValue('Last');
        await CheckoutPage.postalCodeInput.setValue('1000');
        await CheckoutPage.continueButton.click();
    })
    it('should show overview page with correct product and total price', async () => {
        const selectedItem = await CheckoutPage.getElementByDataTest(selectedItemTitleLink);
        await expect(selectedItem).toExist();
        expect(await CheckoutPage.subTotalLabel).toExist()
        const rawText = await CheckoutPage.subTotalLabel.getText();
        const match = rawText.match(/\$\d+(\.\d{2})?/);
        const price = match ? match[0] : null;
        expect(price).toBe(`${selectedPrice}`);
    })
    it('should complete checkout and show confirmation', async () => {
        await CheckoutPage.finishButton.click();
        await expect( await CheckoutPage.completeHeader).toHaveText(`Thank you for your order!`);
    })
    it('should return to inventory with empty cart', async () => {
        await CheckoutPage.backButton.click();
        await expect(await ProductPage.inventoryContainer).toExist();
        await expect(await ProductPage.shoppingCartBadge).not.toBeDisplayed();
    })
    it('should correctly sort products from Z to A', async () => {
        const selectElement = await ProductPage.productSortContainer;
        await selectElement.selectByAttribute('value', 'za');
        const selectedItem = await ProductPage.getElementByDataTest(selectedItemTitleLink);

        const lastItemAttr = await ProductPage.lastItemTitleAttr;
        const selectedItemAttr = await selectedItem.getAttribute('data-test');

        await expect(lastItemAttr).toBe(selectedItemAttr);
    })
});

