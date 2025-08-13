const Page = require('./page');

class ProductListPage extends Page {
    open() {
        return super.open('inventory.html');
    }

    get inventoryContainer() {
        return $('[data-test="inventory-container"]');
    }

    get productSortContainer() {
        return $('[data-test="product-sort-container"]');
    }

    get shoppingCartBadge() {
        return $('[data-test="shopping-cart-badge"]');
    }

    get shoppingCart() {
        return $('[data-test="shopping-cart-link"]');
    }

    get checkoutButton() {
        return $('[data-test="checkout"]');
    }

    get menuItems() {
        return $$('.menu-item');
    }

    get logoutSidebarLink() {
        return $('[data-test="logout-sidebar-link"]');
    }

    get twitterLink() {
        return $('[data-test="social-twitter"]');
    }

    get facebookLink() {
        return $('[data-test="social-facebook"]');
    }

    get linkedinLink() {
        return $('[data-test="social-linkedin"]');
    }

    get menuButton() {
        return $('#react-burger-menu-btn');
    }

    get inventoryItem() {
        return $('[data-test="inventory-item"]');
    }

    getAddToCartButton(n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test^="add-to-cart-"]')
    }

    getPrice(n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test="inventory-item-price"]')
    }

    async openMenu() {
        return this.menuButton.click();
    }

    async getSelectedItemTitleAttr(n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test$="-title-link"]').getAttribute('data-test');
    }

    async logout() {
        return this.logoutSidebarLink.click();
    }

    async getProductNames() {
        const elements = await $$('[data-test="inventory-item-name"]');
        return elements.map(e => e.getText());
    }

    async getProductPrices() {
        const elements = await $$('[data-test="inventory-item-price"]');
        return elements.map(async e => parseFloat((await e.getText()).replace('$', '')));
    }

    async openShoppingCart() {
        await this.click(this.shoppingCart);
    }

    async openCheckout() {
        await this.click(this.checkoutButton);
    }

    async clickAddToCartButton(i) {
        await this.getAddToCartButton(i).click();
    }

    async sortProducts(sortType) {
        await this.selectByAttribute(this.productSortContainer, 'value', sortType);
    }

    async getPriceText(index) {
        return await this.getText(this.getPrice(index));
    }

}

module.exports = new ProductListPage();
