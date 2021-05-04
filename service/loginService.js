const loginModels = require('../models/login');
const messageError = require('../helpers/messageError');
const status = require('../helpers/status.json');
const message = require('../helpers/message.json');

const login = async (email, password) => {
    const result = await loginModels.login(email, password);
    if (result === null || !result || result.password !== password) {   
        return messageError(status.Unauthorized, message.invalidEmail);
    }
    return result;
};

module.exports = { 
    login,
};