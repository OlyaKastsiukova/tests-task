const loginPage = require('../pageobjects/login.page')
const { verifySorting } = require("../helpers/sorting.helper");

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Product Sorting', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login(USERNAME, PASSWORD);
    });
    it('should correctly sort products', async () => {
        await verifySorting('az', 'names', (arr) => [...arr].sort());
        await verifySorting('za', 'names', (arr) => [...arr].sort().reverse());
        await verifySorting('lohi', 'prices', (arr) => [...arr].sort((a, b) => a - b));
        await verifySorting('hilo', 'prices', (arr) => [...arr].sort((a, b) => b - a));
    });
});