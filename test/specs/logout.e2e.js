const loginPage = require('../pageobjects/login.page')
const productListPage = require('../pageobjects/product-list.page')

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Logout', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login(USERNAME, PASSWORD);
    });
    it('should click on menu button and see 4 menu items and should logout', async () => {
        await productListPage.openMenu();
        const items = await productListPage.menuItems;
        await expect(items).toHaveLength(4);
        await productListPage.logout();
        await expect(await loginPage.inputPassword.getText()).toBe("");
        await expect(await loginPage.inputUsername.getText()).toBe("");
    });
});