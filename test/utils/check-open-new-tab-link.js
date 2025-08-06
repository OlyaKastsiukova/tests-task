const { expect } = require("@wdio/globals");

export const checkOpenNewTabLink = async (link, site) => {
    const targetAttr = await link.getAttribute('target');
    expect(targetAttr).toBe('_blank');

    await link.click();

    const handles = await browser.getWindowHandles();
    expect(handles.length).toBeGreaterThan(1);

    await browser.switchToWindow(handles[1]);

    const url = await browser.getUrl();
    expect(url).toContain(site);

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
}