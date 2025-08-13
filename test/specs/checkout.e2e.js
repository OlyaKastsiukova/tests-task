const loginPage = require('../pageobjects/login.page')
const productListPage = require('../pageobjects/product-list.page')
const checkoutPage = require('../pageobjects/checkout.page')

const ELEMENT_INDEX_TO_ADD = 1;
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

describe('Checkout', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login(USERNAME, PASSWORD);
        await productListPage.open();
    });
    let selectedPrice;
    let selectedItemTitleLink;

    it('should complete full checkout process', async () => {
        // Add product to cart and store price
        await expect(await productListPage.inventoryContainer).toBeDisplayed();
        await productListPage.clickAddToCartButton(ELEMENT_INDEX_TO_ADD);
        await expect(await productListPage.shoppingCartBadge).toHaveText('1');
        selectedPrice = await productListPage.getPriceText(ELEMENT_INDEX_TO_ADD);
        selectedItemTitleLink = await productListPage.getSelectedItemTitleAttr(ELEMENT_INDEX_TO_ADD);

        // Saving the card after logout
        await productListPage.openMenu();
        await productListPage.logout();
        await loginPage.login(USERNAME, PASSWORD);
        await expect(await productListPage.shoppingCartBadge).toHaveText('1');

        // Navigate to cart and verify product
        await productListPage.openShoppingCart();
        const selectedItem = await checkoutPage.getElementByDataTest(selectedItemTitleLink);
        await expect(selectedItem).toBeDisplayed();

        // Open checkout form
        await productListPage.openCheckout();
        await expect(await checkoutPage.firstNameInput).toBeDisplayed();

        // Test validation error
        await checkoutPage.clickContinue();
        await expect(await checkoutPage.error).toBeDisplayed();

        // Fill and submit checkout form
        await checkoutPage.fillCheckoutForm('First', 'Last', '1000');
        await checkoutPage.clickContinue();
        const url = await checkoutPage.getUrl();
        expect(url).toContain(checkoutPage.checkoutStepTwoUrl);

        // Verify overview page
        await expect(await selectedItem).toBeDisplayed();
        await expect(await checkoutPage.subTotalLabel).toBeDisplayed()
        const rawText = await checkoutPage.getSubTotalText();
        const price = checkoutPage.extractPriceFromText(rawText);
        expect(price).toBe(`${selectedPrice}`);

        // Complete checkout
        await checkoutPage.clickFinish();
        await expect(await checkoutPage.completeHeader).toHaveText(checkoutPage.thanksOrderText);

        // Return to inventory
        await checkoutPage.clickBackToProducts();
        await expect(await productListPage.inventoryContainer).toBeDisplayed();
        await expect(await productListPage.shoppingCartBadge).not.toBeDisplayed();
    });

    it('should open empty card page', async () => {
        await expect(await productListPage.shoppingCartBadge).not.toBeDisplayed();
        await productListPage.openShoppingCart();
        await expect(await productListPage.inventoryItem).not.toBeDisplayed();
    });

});