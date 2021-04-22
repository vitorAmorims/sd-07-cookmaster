const error = require('./errorMiddleware');
const checkFieldsMiddleares = require('./checkFieldsRegister');
const checkFormatEmail = require('./checkFormatEmail');
const checkFieldsLogin = require('./checkFieldsLogin');
const checkRegisterRecipes = require('./checkFieldsRecipes');
const authentication = require('./auth');
const autthUser = require('./authUser');
const authAdmin = require('./authAdmin');

module.exports = {
    error,
    checkFieldsMiddleares,
    checkFormatEmail,
    checkFieldsLogin,
    authentication,
    checkRegisterRecipes,
    autthUser,
    authAdmin,
};