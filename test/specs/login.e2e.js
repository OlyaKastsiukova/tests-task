const loginPage = require('../pageobjects/login.page')
const productListPage = require('../pageobjects/product-list.page')
const { loginWithError } = require("../helpers/login.helper");

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Login', () => {
    beforeEach(async () => {
        await loginPage.open();
    });
    it('should log in successfully', async () => {
        await loginPage.login(USERNAME, PASSWORD);
        await expect(await productListPage.inventoryContainer).toBeDisplayed();
        await expect(await productListPage.shoppingCart).toBeDisplayed();
    });
    it(`should show login error`, async () => {
        await loginWithError('standard_user', 'dfdfdffd');
        await loginWithError('standarD_user', 'secret_sauce');
    });
});