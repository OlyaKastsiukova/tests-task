const { $ } = require('@wdio/globals')
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

    open() {
        return super.open('');
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.submitButton.click();
    }
}

module.exports = new LoginPage();
