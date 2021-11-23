const {vkProjectTestData} = require('../../testdata/test.data');

const requests = {
    createPost: (randomText) => `${vkProjectTestData.vkApiLink}wall.post?owner_id=${vkProjectTestData.userId}&message=${randomText}&access_token=${vkProjectTestData.token}&v=${vkProjectTestData.apiVersion}`,
    editPost: (postId, editedText, photoId) => `${vkProjectTestData.vkApiLink}wall.edit?owner_id=${vkProjectTestData.userId}&post_id=${postId}&message=${editedText}&attachments=photo${vkProjectTestData.userId}_${photoId}&access_token=${vkProjectTestData.token}&v=${vkProjectTestData.apiVersion}`,
    addComment: (postId, randomComment) => `${vkProjectTestData.vkApiLink}wall.createComment?owner_id=${vkProjectTestData.userId}&post_id=${postId}&message=${randomComment}&access_token=${vkProjectTestData.token}&v=${vkProjectTestData.apiVersion}`,
    getPostLikes: (postId) => `${vkProjectTestData.vkApiLink}likes.getList?type=post&owner_id=${vkProjectTestData.userId}&item_id=${postId}&access_token=${vkProjectTestData.token}&v=${vkProjectTestData.apiVersion}&extended=${vkProjectTestData.likesListExt}`,
    deletePost: (postId) => `${vkProjectTestData.vkApiLink}wall.delete?post_id=${postId}&owner_id=${vkProjectTestData.userId}&access_token=${vkProjectTestData.token}&v=${vkProjectTestData.apiVersion}`,
    getWallUploadServer: (postId) => `${vkProjectTestData.vkApiLink}photos.getWallUploadServer?&owner_id=${vkProjectTestData.userId}?post_id=${postId}&access_token=${vkProjectTestData.token}&v=${vkProjectTestData.apiVersion}`,
    saveWallPhoto: (photo, server, hash) => `${vkProjectTestData.vkApiLink}photos.saveWallPhoto?&user_id=${vkProjectTestData.userId}&access_token=${vkProjectTestData.token}&v=${vkProjectTestData.apiVersion}&photo=${photo}&server=${server}&hash=${hash}`,
    getPhotoUrl: (photoId) => `${vkProjectTestData.vkApiLink}photos.getById?photos=${vkProjectTestData.userId}_${photoId}&access_token=${vkProjectTestData.token}&v=${vkProjectTestData.apiVersion}`
}

module.exports = {requests};