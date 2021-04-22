const error = require('./error');
const userFieldsValidation = require('./userFieldsValidatation');
const emailValidation = require('./emailValidation');
const loginFieldsValidation = require('./loginFieldsValidation');
const loginEmailValidation = require('./loginEmailValidation');
const loginPasswordValidation = require('./loginPasswordValidation');
const validateToken = require('./validateToken');
const recipeFieldsValidatation = require('./recipeFieldsValidation');
const addImageValidation = require('./addImageValidation');
const validateAdm = require('./validateAdm');

module.exports = {
    error,
    userFieldsValidation,
    emailValidation,
    loginFieldsValidation,
    loginEmailValidation,
    loginPasswordValidation,
    validateToken,
    recipeFieldsValidatation,
    addImageValidation,
    validateAdm,
};
