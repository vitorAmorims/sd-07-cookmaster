const users = require('../models/usersModel');
const codes = require('./codes');

const createUser = async (email, password, name, role) => {
    const result = await users.createUser(email, password, name, role);
    if (!result) return { statusCode: codes.conflict, message: 'Email already registered' };

    return result;
};

const loginUser = async (email, password) => {
    const result = await users.loginUser(email, password);
    if (!result) {
 return {
        statusCode: codes.unauthorized, message: 'Incorrect username or password',
    }; 
}
    return result;
};

module.exports = {
    createUser,
    loginUser,
};