const {expect} = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const ProductListPage = require('../pageobjects/product-list.page')
const CheckoutPage = require('../pageobjects/checkout.page')
const {checkOpenNewTabLink} = require('../utils/check-open-new-tab-link')

const ELEMENT_INDEX_TO_ADD = 1;
const ERROR_COLOR = '#e2231a';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Login with invalid password', () => {
    before(async () => {
        await LoginPage.open();
    })
    it('should log in with error use wrong password', async () => {
        await LoginPage.login('standard_user', 'dfdfdffd');
        expect(await LoginPage.inputUsernameCircle).toBeDisplayed();
        expect(await LoginPage.inputPasswordCircle).toBeDisplayed();
        const inputUsername = await LoginPage.inputUsername;
        const inputPassword = await LoginPage.inputPassword;
        const borderColorUsername = await inputUsername.getCSSProperty('border-bottom-color');
        expect(borderColorUsername.parsed.hex).toBe(ERROR_COLOR);
        const borderColorPassword = await inputPassword.getCSSProperty('border-bottom-color');
        expect(borderColorPassword.parsed.hex).toBe(ERROR_COLOR);
        expect(await LoginPage.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
});

describe('Login with invalid login', () => {
    before(async () => {
        await LoginPage.open();
    })
    it('should log in with error use wrong password', async () => {
        await LoginPage.login('standarD_user', 'secret_sauce');
        expect(await LoginPage.inputUsernameCircle).toBeDisplayed();
        expect(await LoginPage.inputPasswordCircle).toBeDisplayed();
        const inputUsername = await LoginPage.inputUsername;
        const inputPassword = await LoginPage.inputPassword;
        const borderColorUsername = await inputUsername.getCSSProperty('border-bottom-color');
        expect(borderColorUsername.parsed.hex).toBe(ERROR_COLOR);
        const borderColorPassword = await inputPassword.getCSSProperty('border-bottom-color');
        expect(borderColorPassword.parsed.hex).toBe(ERROR_COLOR);
        expect(await LoginPage.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
});

describe('Login', () => {
    before(async () => {
        await LoginPage.open();
    })
    it('should log in successfully', async () => {
        const inputType = await LoginPage.inputPassword.getAttribute('type');
        expect(inputType).toBe('password');

        await LoginPage.login(USERNAME, PASSWORD);
        expect(await ProductListPage.inventoryContainer).toBeDisplayed();
        expect(await ProductListPage.shoppingCart).toBeDisplayed();
    })
});

describe('Logout', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERNAME, PASSWORD);
        expect(await ProductListPage.inventoryContainer).toBeDisplayed();
        expect(await ProductListPage.shoppingCart).toBeDisplayed();
    })
    it('should click on menu button and see 4 menu items', async () => {
        const menuButton = await ProductListPage.menuButton;
        await menuButton.click();
        const items = await ProductListPage.menuItems;
        expect(items).toHaveLength(4);
    })
    it('should logout', async () => {
        const logoutButton = await ProductListPage.logoutSidebarLink;
        await logoutButton.click();
        expect(await LoginPage.inputPassword.getText()).toBe("");
        expect(await LoginPage.inputUsername.getText()).toBe("");
    })
});

describe('Saving the card after logout', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERNAME, PASSWORD);
        expect(await ProductListPage.inventoryContainer).toBeDisplayed();
        expect(await ProductListPage.shoppingCart).toBeDisplayed();
    })
    it('should add product to cart', async () => {
        await ProductListPage.getAddToCartButton(ELEMENT_INDEX_TO_ADD).click();
        expect(await ProductListPage.shoppingCartBadge).toHaveText('1');
    })
    it('should click on menu button and see 4 menu items', async () => {
        const menuButton = await ProductListPage.menuButton;
        await menuButton.click();
        const items = await ProductListPage.menuItems;
        expect(items).toHaveLength(4);
    })
    it('should logout', async () => {
        const logoutButton = await ProductListPage.logoutSidebarLink;
        await logoutButton.click();
        expect(await LoginPage.inputPassword.getText()).toBe("");
        expect(await LoginPage.inputUsername.getText()).toBe("");
    })
    it('should log in successfully', async () => {
        await LoginPage.login(USERNAME, PASSWORD);
        expect(await ProductListPage.inventoryContainer).toBeDisplayed();
    })
    it('should navigate to cart and verify product', async () => {
        const selectedItemTitleLink = await ProductListPage.getSelectedItemTitleAttr(ELEMENT_INDEX_TO_ADD);
        await ProductListPage.shoppingCart.click();
        const selectedItem = await CheckoutPage.getElementByDataTest(selectedItemTitleLink);
        expect(await selectedItem).toBeDisplayed();
    })
});
describe('Sorting', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERNAME, PASSWORD);
        expect(await ProductListPage.inventoryContainer).toBeDisplayed();
        expect(await ProductListPage.shoppingCart).toBeDisplayed();
    })
    it('should correctly sort products from Z to A', async () => {
        const selectElement = await ProductListPage.productSortContainer;
        await selectElement.selectByAttribute('value', 'za');

        const names = await ProductListPage.getProductNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    })
    it('should correctly sort products from price low to high', async () => {
        const selectElement = await ProductListPage.productSortContainer;
        await selectElement.selectByAttribute('value', 'lohi');

        const names = await ProductListPage.getProductPrices();
        const sortedNames = [...names].sort((a, b) => a - b)
        expect(names).toEqual(sortedNames);
    })
    it('should correctly sort products from price low to high', async () => {
        const selectElement = await ProductListPage.productSortContainer;
        await selectElement.selectByAttribute('value', 'hilo');

        const names = await ProductListPage.getProductPrices();
        const sortedNames = [...names].sort((a, b) => b - a)
        expect(names).toEqual(sortedNames);
    })
    it('should correctly sort products from Z to A', async () => {
        const selectElement = await ProductListPage.productSortContainer;
        await selectElement.selectByAttribute('value', 'az');

        const names = await ProductListPage.getProductNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    })
});

describe('Valid Checkout Flow', () => {
    let selectedPrice;
    let selectedItemTitleLink;

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERNAME, PASSWORD);
        await ProductListPage.open();
        await ProductListPage.getRemoveFromCartButton(ELEMENT_INDEX_TO_ADD).click();
    })
    it('should add product to cart and store price', async () => {
        await ProductListPage.getAddToCartButton(ELEMENT_INDEX_TO_ADD).click();
        expect(await ProductListPage.shoppingCartBadge).toHaveText('1');
        selectedPrice = await ProductListPage.getPrice(ELEMENT_INDEX_TO_ADD).getText();
    })
    it('should add product to cart', async () => {
        await ProductListPage.getAddToCartButton(ELEMENT_INDEX_TO_ADD + 1).click();
        expect(await ProductListPage.shoppingCartBadge).toHaveText('2');
    })
    it('should remove product from cart', async () => {
        await ProductListPage.getRemoveFromCartButton(ELEMENT_INDEX_TO_ADD + 1).click();
        expect(await ProductListPage.shoppingCartBadge).toHaveText('1');
    })
    it('should navigate to cart and verify product', async () => {
        selectedItemTitleLink = await ProductListPage.getSelectedItemTitleAttr(ELEMENT_INDEX_TO_ADD);
        await ProductListPage.shoppingCart.click();
        const selectedItem = await CheckoutPage.getElementByDataTest(selectedItemTitleLink);
        expect(await selectedItem).toBeDisplayed();
    })
    it('should open checkout form', async () => {
        await ProductListPage.checkoutButton.click();
        expect(await CheckoutPage.firstNameInput).toBeDisplayed();
    })
    it('should show validation error when checkout fields are empty', async () => {
        await CheckoutPage.continueButton.click();
        expect(await CheckoutPage.error).toBeDisplayed();
    })
    it('should fill out and submit checkout form', async () => {
        await CheckoutPage.firstNameInput.setValue('First');
        await CheckoutPage.lastNameInput.setValue('Last');
        await CheckoutPage.postalCodeInput.setValue('1000');
        await CheckoutPage.continueButton.click();
        const url = await browser.getUrl();
        expect(url).toContain(CheckoutPage.checkoutStepTwoUrl);
    })
    it('should show overview page with correct product and total price', async () => {
        const selectedItem = await CheckoutPage.getElementByDataTest(selectedItemTitleLink);
        expect(await selectedItem).toBeDisplayed();
        expect(await CheckoutPage.subTotalLabel).toBeDisplayed()
        const rawText = await CheckoutPage.subTotalLabel.getText();
        const match = rawText.match(/\$\d+(\.\d{2})?/);
        const price = match ? match[0] : null;
        expect(price).toBe(`${selectedPrice}`);
    })
    it('should complete checkout and show confirmation', async () => {
        await CheckoutPage.finishButton.click();
        expect(await CheckoutPage.completeHeader).toHaveText(`Thank you for your order!`);
    })
    it('should return to inventory with empty cart', async () => {
        await CheckoutPage.backButton.click();
        expect(await ProductListPage.inventoryContainer).toBeDisplayed();
        expect(await ProductListPage.shoppingCartBadge).not.toBeDisplayed();
    })
});

describe('Checkout without products', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERNAME, PASSWORD);
        expect(await ProductListPage.inventoryContainer).toBeDisplayed();
        expect(await ProductListPage.shoppingCart).toBeDisplayed();
    })
    it('should open empty card page', async () => {
        expect(await ProductListPage.shoppingCartBadge).not.toBeDisplayed();
        await ProductListPage.shoppingCart.click();
        expect(await ProductListPage.inventoryItem).not.toBeDisplayed();
    })
});

describe('Footer Links', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERNAME, PASSWORD);
        expect(await ProductListPage.inventoryContainer).toBeDisplayed();
        expect(await ProductListPage.shoppingCart).toBeDisplayed();
    })
    it('should open Twitter link in a new tab with target="_blank', async () => {
        await checkOpenNewTabLink(await ProductListPage.twitterLink, 'x.com');
    })
    it('should open Facebook link in a new tab with target="_blank', async () => {
        await checkOpenNewTabLink(await ProductListPage.facebookLink, 'facebook.com');
    })
    it('should open Linkedin link in a new tab with target="_blank', async () => {
        await checkOpenNewTabLink(await ProductListPage.linkedinLink, 'linkedin.com');
    })
});