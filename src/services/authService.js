const jwt = require('jsonwebtoken');
const constants = require('../const');

const generateAuthToken = (email, password) => {
    const token = jwt.sign({ email, password }, constants.textoAleatorio);
    console.log(token);
    return token;
};

module.exports = {
    generateAuthToken,
};