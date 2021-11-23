const {By} = require('selenium-webdriver');

const vkLoginPageLocators = {
    'loginField': By.xpath("//input[@id='index_email']"),
    'passwordField': By.xpath("//input[@id='index_pass']"),
    'loginButton': By.xpath("//button[@id='index_login_button']"),
};

module.exports = {vkLoginPageLocators};