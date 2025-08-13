const Page = require('./page');

class LoginPage extends Page {
    get inputUsername() {
        return $('[data-test="username"]');
    }

    get inputUsernameCircle() {
        return $('[data-test="username"] + svg');
    }

    get inputPassword() {
        return $('[data-test="password"]');
    }

    get inputPasswordCircle() {
        return $('[data-test="password"] + svg');
    }

    get submitButton() {
        return $('[data-test="login-button"]');
    }

    get error() {
        return $('[data-test="login-container"] [data-test="error"]');
    }

    get errorText() {
        return this.getText(this.error);
    }

    open() {
        return super.open('');
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.submitButton.click();
    }

    async getErrorUserNameBorder() {
        return await this.getCSSProperty(this.inputUsername, 'border-bottom-color');
    }

    async getErrorPasswordBorder() {
        return await this.getCSSProperty(this.inputPassword, 'border-bottom-color');
    }
}

module.exports = new LoginPage();
