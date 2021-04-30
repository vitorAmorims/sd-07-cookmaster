const { createUser, getEmailUser } = require('./userService');
const { getLogin } = require('./loginService');
const { imageService } = require('./imageService');
const { uploadImage } = require('./uploadImageService');

module.exports = { createUser, getEmailUser, getLogin, imageService, uploadImage };
