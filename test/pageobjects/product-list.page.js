const { $ } = require('@wdio/globals')
const Page = require('./page');

class ProductListPage extends Page {
    open() {
        return super.open('inventory.html');
    }

    get title() {
        return $('[data-test="title"]');
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

    getRemoveFromCartButton(n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('button[data-test^="remove-"]')
    }

    getAddToCartButton(n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test^="add-to-cart-"]')
    }

    async getSelectedItemTitleAttr(n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test$="-title-link"]').getAttribute('data-test');
    }

    getPrice(n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test="inventory-item-price"]')
    }

    async getProductNames() {
        const elements = await $$('[data-test="inventory-item-name"]');
        return elements.map(e => e.getText());
    }

    async getProductPrices() {
        const elements = await $$('[data-test="inventory-item-price"]');
        return elements.map(async e => parseFloat((await e.getText()).replace('$', '')));
    }

}

module.exports = new ProductListPage();
