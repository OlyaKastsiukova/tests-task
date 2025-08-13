module.exports = class Page {
    open(path) {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }

    getElementByDataTest(dataTest) {
        return $(`[data-test="${dataTest}"]`);
    }

    async click(element) {
        await element.click();
    }

    async setValue(element, value) {
        await element.setValue(value);
    }

    async getText(element) {
        return await element.getText();
    }

    async getAttribute(element, attribute) {
        return await element.getAttribute(attribute);
    }

    async getCSSProperty(element, property) {
        return await element.getCSSProperty(property);
    }

    async selectByAttribute(element, attribute, value) {
        await element.selectByAttribute(attribute, value);
    }

    async getUrl() {
        return await browser.getUrl();
    }

    async getWindowHandles() {
        return await browser.getWindowHandles();
    }

    async switchToWindow(handle) {
        await browser.switchToWindow(handle);
    }

    async closeWindow() {
        await browser.closeWindow();
    }
}
