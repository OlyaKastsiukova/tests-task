const loginPage = require('../pageobjects/login.page')
const productListPage = require('../pageobjects/product-list.page')
const { checkOpenNewTabLink } = require('../helpers/footer.helper')

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Footer soc links', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login(USERNAME, PASSWORD);
    });
    it('should open social link in a new tab with target="_blank', async () => {
        await checkOpenNewTabLink(await productListPage.twitterLink, 'x.com');
        await checkOpenNewTabLink(await productListPage.facebookLink, 'facebook.com');
        await checkOpenNewTabLink(await productListPage.linkedinLink, 'linkedin.com');
    });
});