const loginModel = require('../models/loginModel');
const authService = require('./authService');

const constants = require('../const');

const userIsValid = async (email, password) => {
    if (!await loginModel.login(email, password)) return false;
    return true;        
};

const emailIsValid = (email) => {
    if (email === undefined) return false;
    return true;
};

const passwordIsValid = (password) => {
    if (password === undefined) return false;
    return true;
};

const login = async (email, password) => {
    if (!emailIsValid(email) || !passwordIsValid(password)) {
        return {
            error: {
                message: constants.allFieldsMustBeFilled,
                status: constants.UNAUTHORIZED,
            },
        };
    }
    if (!await userIsValid(email, password)) {
        return {
            error: {
                message: constants.incorrectUsernameOrPassword,
                status: constants.UNAUTHORIZED,
            },
        };
    }
    return authService.generateAuthToken(email, password);
};

module.exports = {
    login,
};