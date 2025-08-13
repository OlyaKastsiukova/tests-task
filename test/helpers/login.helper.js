import loginPage from "../pageobjects/login.page";
const ERROR_COLOR = '#e2231a';

export const loginWithError = async (user, password) => {
    await loginPage.login(user, password);

    await expect(await loginPage.inputUsernameCircle).toBeDisplayed();
    await expect(await loginPage.inputPasswordCircle).toBeDisplayed();

    const borderColorUsername = await loginPage.getErrorUserNameBorder();
    expect(borderColorUsername.parsed.hex).toBe(ERROR_COLOR);

    const borderColorPassword = await loginPage.getErrorPasswordBorder();
    expect(borderColorPassword.parsed.hex).toBe(ERROR_COLOR);

    const errorText = await loginPage.errorText;
    expect(errorText).toBe('Epic sadface: Username and password do not match any user in this service');
}