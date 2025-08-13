const productListPage = require('../pageobjects/product-list.page')
export const checkOpenNewTabLink = async (link, site) => {
    const targetAttr = await link.getAttribute('target');
    expect(targetAttr).toBe('_blank');

    await link.click();

    const handles = await productListPage.getWindowHandles();
    expect(handles.length).toBeGreaterThan(1);

    await productListPage.switchToWindow(handles[1]);

    const url = await productListPage.getUrl();
    expect(url).toContain(site);

    await productListPage.closeWindow();
    await productListPage.switchToWindow(handles[0]);
}