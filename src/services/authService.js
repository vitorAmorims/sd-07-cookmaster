const jwt = require('jsonwebtoken');
const constants = require('../const');

const generateAuthToken = (email, password) => {
    const token = jwt.sign({ email, password }, constants.textoAleatorio);
    return token;
};

const tokenIsValid = (token) => {
    try {
        return jwt.verify(token, constants.textoAleatorio);
    } catch (error) {
        return false;
    }
};

module.exports = {
    generateAuthToken,
    tokenIsValid,
};