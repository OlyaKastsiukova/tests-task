import productListPage from "../pageobjects/product-list.page";

export const verifySorting = async(sortType, sortField, sortFunction) => {
    await productListPage.sortProducts(sortType);

    let actualData;
    if (sortField === 'names') {
        actualData = await productListPage.getProductNames();
    } else {
        actualData = await productListPage.getProductPrices();
    }

    const expectedData = sortFunction(actualData);
    expect(actualData).toEqual(expectedData);
}