const {expect} = require('chai');
const {testData, path, hoversTestUserNumbers, sliderValues, sliderMap, vkProjectTestData} = require('../testData/test.data');
const RandomGenerators = require('../framework/utils/randomGenerator');
const Browser = require('../framework/browser/browser');
const LoginPage = require('./pages/loginPage');
const AlertsPage = require('./pages/alertsPage');
const SliderPage = require('./pages/sliderPage');
const IFramePage = require('./pages/iFramePage');
const HoversPage = require('./pages/hoversPage');
const VKLoginPage = require('./pages/vkLoginPage');
const NavigationBarPage = require('./pages/navigationBarPage');
const WallPage = require('./pages/wallPage');
const VkApiUtils = require('../framework/utils/vkApiUtils');
const Logger = require('../framework/utils/logger');
const FormData = require('form-data');
const fs = require('fs/promises');
const ImageUtils = require('../framework/utils/imagesComparing');
const DownloadUtils = require('../framework/utils/downloadUtils');

it('Basic Authorization', async () => {
    await Browser.navigate(`${testData.hostForBasicAuth(testData.login, testData.password)}${path.basicAuth}`);
    await Browser.windowMaximize();
    const loginPage = new LoginPage();
    expect (await loginPage.getSuccessfullAuthText()).to.eql(testData.congratulationsText);
});

it('Alerts', async () => {
    await Browser.navigate(`${testData.host}${path.alerts}`);
    await Browser.windowMaximize();
    const alertsPage = new AlertsPage();
    expect (await alertsPage.isDisplayed()).to.eql(testData.pageIsDisplaying);
    await alertsPage.jsAlertButtonClick();
    expect (await alertsPage.getAlertText()).to.eql(testData.jsAlertTitle);
    await alertsPage.acceptAlert();
    expect (await alertsPage.alertIsPresent()).to.eql(testData.alertIsNotPresent);
    expect (await alertsPage.getResultText()).to.eql(testData.resultAlertText);
    await alertsPage.jsConfirmButtonClick();
    expect (await alertsPage.getAlertText()).to.eql(testData.jsConfirmTitle);
    await alertsPage.acceptAlert();
    expect (await alertsPage.alertIsPresent()).to.eql(testData.alertIsNotPresent);
    expect (await alertsPage.getResultText()).to.eql(testData.resultConfirmText);
    await alertsPage.jsPromptButtonClick();
    expect (await alertsPage.getAlertText()).to.eql(testData.jsPromptTitle);
    const randomText = RandomGenerators.randomStr(testData.randomStringLength);
    await alertsPage.sendKeysToAlert(randomText);
    await alertsPage.acceptAlert();
    expect (await alertsPage.getResultText()).to.eql(testData.resultPromptText(randomText));
});

it('Slider', async () => {
        await Browser.navigate(`${testData.host}${path.slider}`);
        await Browser.windowMaximize();
        const sliderPage = new SliderPage();
        expect (await sliderPage.isDisplayed()).to.eql(testData.pageIsDisplaying);
        const randomSliderPosition = RandomGenerators.getRandomValueFromArray(sliderValues);
        await sliderPage.dragAndDropSlider(randomSliderPosition);
        expect (await sliderPage.getSliderValue()).to.eql(sliderMap.get(randomSliderPosition));
});

hoversTestUserNumbers.forEach(function(userNumber) {

        it(`Hovers (Test User Number ${userNumber})`, async () => {
                await Browser.navigate(`${testData.host}${path.hovers}`);
                await Browser.windowMaximize();
                const hoversPage = new HoversPage();
                expect (await hoversPage.isDisplayed()).to.eql(testData.pageIsDisplaying);
                await hoversPage.moveCursorToHover(userNumber);
                expect (await hoversPage.getHoverText(userNumber)).to.eql(testData.hoverText(userNumber));
                expect (await hoversPage.hoverLinkIsDisplayed(userNumber)).to.eql(testData.elementIsDisplaying);
                const hoverLinkHref = await hoversPage.getHoverLinkHref(userNumber);
                await hoversPage.hoverLinkClick(userNumber);
                expect (await Browser.getCurrentUrl()).to.eql(hoverLinkHref);
                await Browser.backToPreviousPage();
        });

});

it('IFrame', async () => {
        await Browser.navigate(`${testData.host}${path.iframe}`);
        await Browser.windowMaximize();
        const iFramePage = new IFramePage();
        expect (await iFramePage.isDisplayed()).to.eql(testData.pageIsDisplaying);
        await iFramePage.switchToFrame();
        await iFramePage.waitingFrameTextField();
        await Browser.switchToDefault();
        await iFramePage.alignLeftButtonClick();
        await iFramePage.switchToFrame();
        expect (await iFramePage.getFrameStyleAttribute()).to.include(testData.testAlignLeft);
        await iFramePage.highlightText();
        await Browser.switchToDefault();
        await iFramePage.changeFontSize();
});


it('VK sign in and operations with post', async () => {
    await Browser.navigate(vkProjectTestData.link);
    await Browser.windowMaximize();
    const loginPage = new VKLoginPage();
    await loginPage.authorize(vkProjectTestData.login, vkProjectTestData.password);
    const navigationBarPage = new NavigationBarPage();
    await navigationBarPage.waitingMyPageButton();
    await navigationBarPage.myPageButtonClick();
    const randomText = RandomGenerators.randomStr(vkProjectTestData.randomStringLength);
    await Logger.infoLog(`Generated text is ${randomText}`);
    const postId = await VkApiUtils.createPost(randomText);
    await Logger.infoLog(`Post ID of the created post is ${postId}`);
    const wallPage = new WallPage();
    const author = await wallPage.getAuthorText();
    await wallPage.waitingPostWithText(postId, randomText);
    expect (await wallPage.getPostText(postId)).to.eql(randomText);
    expect (await wallPage.getPostAuthor(postId)).to.eql(author)
    const uploadUrl = await VkApiUtils.getWallUploadServer(postId);;
    const image = await fs.readFile(vkProjectTestData.filePath);
    const form = new FormData();
    form.append(vkProjectTestData.formDataKey, image, vkProjectTestData.formDataValue);
    let {photo, server, hash} = await VkApiUtils.uploadPhotoToUrl(uploadUrl, form);
    const photoId = await VkApiUtils.saveWallPhoto(photo, server, hash);
    const randomTextEdited = RandomGenerators.randomStr(vkProjectTestData.randomStringLength);
    await VkApiUtils.editPost(postId, randomTextEdited, photoId);
    await wallPage.waitingPostWithText(postId, randomTextEdited);
    const uploadedImageUrl = await VkApiUtils.getPhotoUrl(photoId);
    const downloadUtils = new DownloadUtils();
    await downloadUtils.downloadImageByUrl(uploadedImageUrl, vkProjectTestData.pathToUploadedImage);
    const imageUtils = new ImageUtils();
    const imageDifference = await imageUtils.imagesComparing();
    expect (imageDifference).to.eql(vkProjectTestData.expectedImageDifference);
    expect (await wallPage.getPostText(postId)).to.eql(randomTextEdited);
    const randomComment = RandomGenerators.randomStr(vkProjectTestData.randomStringLength);
    await VkApiUtils.addComment(postId, randomComment);
    await wallPage.waitingNextCommentButton(postId);
    await wallPage.clickNextCommentButton(postId);
    await wallPage.waitingExpectedCommentWithText(postId, randomComment);
    expect (await wallPage.getPostCommentText(postId)).to.eql(randomComment);
    expect (await wallPage.getPostCommentAuthor(postId)).to.eql(author);    
    await wallPage.clickLikeButton(postId);
    const returnedLikesData = await VkApiUtils.getPostLikes(postId);
    const likesCountValue = returnedLikesData.likesCountValue;
    const likeFromFirstName = returnedLikesData.likeFromFirstName;
    const likeFromLastName = returnedLikesData.likeFromLastName;
    expect (likesCountValue).to.eql(vkProjectTestData.expectedLikesCountValue);
    expect (`${likeFromFirstName} ${likeFromLastName}`).to.eql(author);
    await VkApiUtils.deletePost(postId);
    await wallPage.waitingPostIsNotVisible(postId, randomTextEdited);
    expect (await wallPage.deletedPostIsDisplayed(postId, randomTextEdited)).to.be.false;
});