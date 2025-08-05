const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductPage extends Page {
    /**
     * define selectors using getter methods
     */
    get title () {
        return $('[data-test="title"]');
    }
    get inventoryContainer () {
        return $('[data-test="inventory-container"]');
    }
    getAddToCartButton (n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test^="add-to-cart-"]')
    }
    async getSelectedItemTitleAttr(n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test$="-title-link"]').getAttribute('data-test');
    }
    get lastItemTitleAttr() {
        return $('[data-test="inventory-item"]:last-child').$('[data-test$="-title-link"]').getAttribute('data-test');
    }
    get productSortContainer() {
        return $('[data-test="product-sort-container"]');
    }
    getRemoveButton (n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test^="remove-"]')
    }
    getPrice (n) {
        return $(`[data-test="inventory-item"]:nth-child(${n})`).$('[data-test="inventory-item-price"]')
    }
    get shoppingCartBadge () {
        return $('[data-test="shopping-cart-badge"]');
    }
    get shoppingCart() {
        return $('[data-test="shopping-cart-link"]');
    }
    get checkoutButton() {
        return $('[data-test="checkout"]');
    }
}

module.exports = new ProductPage();
