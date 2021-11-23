const BasePage = require('../../framework/basePage/basePage');
const {vkLoginPageLocators} = require('../locators/vkLoginPageLocators');
const TextArea = require('../../framework/baseElement/textArea');
const Button = require('../../framework/baseElement/button');
const Logger = require('../../framework/utils/logger');

class VKLoginPage extends BasePage {
    get loginField() {return new TextArea('loginField', vkLoginPageLocators.loginField);}
    get passwordField() {return new TextArea('passwordField', vkLoginPageLocators.passwordField);}
    get loginButton() {return new Button('loginButton', vkLoginPageLocators.loginButton);}

    async authorize(login, password) {
        this.setLoginValue(login);
        this.setPasswordValue(password);
        this.loginButtonClick(); 
    }

    async setLoginValue(login) {
        Logger.infoLog(`Set value to login field '${login}'`);
        return this.loginField.setValue(login)
    }

    async setPasswordValue(password) {
        Logger.infoLog(`Set value to password field '${password}'`);
        return this.passwordField.setValue(password)
    }

    async loginButtonClick() {
        Logger.infoLog('Click login button');
        return this.loginButton.click()
    }

}

module.exports = VKLoginPage;