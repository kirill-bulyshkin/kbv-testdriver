const {By} = require('selenium-webdriver');

const navigationBarPageLocators = {
    'myPageButton': By.xpath("//span[contains(@class,'left_label') and (contains(text(), 'My profile') or contains(text(), 'Мой профиль'))]")
};

module.exports = {navigationBarPageLocators};