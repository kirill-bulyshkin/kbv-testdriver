const testData = {
    'host': 'http://the-internet.herokuapp.com',
    hostForBasicAuth: (login, pass) => `http://${login}:${pass}@the-internet.herokuapp.com`,
    'login': 'admin',
    'password': 'admin',
    'congratulationsText': 'Congratulations! You must have the proper credentials.',
    'pageIsDisplaying': true,
    'elementIsDisplaying': true,
    'jsAlertTitle': 'I am a JS Alert',
    'jsConfirmTitle': 'I am a JS Confirm',
    'jsPromptTitle': 'I am a JS prompt',
    'alertIsNotPresent': false,
    'resultAlertText': 'You successfully clicked an alert',
    'resultConfirmText': 'You clicked: Ok',
    'randomStringLength': 7,
    resultPromptText: (randomText) => `You entered: ${randomText}`,
    'testAlignLeft': 'text-align: left',
    'timeoutValue': 10000,
    hoverText: (userNumber) => `name: user${userNumber}`,
    'timeoutValue': 80000
};

const path = {
    'basicAuth': '/basic_auth',
    'alerts': '/javascript_alerts',
    'slider': '/horizontal_slider',
    'iframe': '/iframe',
    'hovers': '/hovers'
}

const hoversTestUserNumbers = [1, 3];

const sliderValues = [-60, -50, -30, -20, -10, 0, 10, 20, 30, 50, 60];

const sliderMap = new Map();
sliderMap.set(-60, '0');
sliderMap.set(-50, '0.5');
sliderMap.set(-30, '1');
sliderMap.set(-20, '1.5');
sliderMap.set(-10, '2');
sliderMap.set(0, '2.5');
sliderMap.set(10, '3');
sliderMap.set(20, '3.5');
sliderMap.set(30, '4');
sliderMap.set(50, '4.5');
sliderMap.set(60, '5');

const vkProjectTestData = {
    'link': 'https://vk.com',
    'login': '+375291660762',
    'password': 'PuV6j_.2&$m9h?UYY',
    'token': '134d4ba52aed213e083c0c8b1d5973b25353341332fc8b7a492b5a3f2cb20b5453abe8b2a05ea7f0effb6',
    'userId': '627657327',
    'apiVersion': '5.131',
    'vkApiLink': 'https://api.vk.com/method/',
    'randomStringLength': 5,
    'likesListExt': 1,
    'firstItem': 0,
    'expectedLikesCountValue': 1,
    'filePath': './files/bear.jpg',
    'pathToUploadedImage': './uploadedFiles/uploadedImage.jpg',
    'formDataKey': 'photo',
    'formDataValue': 'bear.jpg',
    'arrayElement': 0,
    'sizesElement': 6,
    'expectedImageDifference': 0
};

module.exports = {testData, path, hoversTestUserNumbers, sliderValues, sliderMap, vkProjectTestData};