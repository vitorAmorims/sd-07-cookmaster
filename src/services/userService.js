const userModel = require('../models/userModel');
const constants = require('../const');

const nameIsValid = (name) => {
    if (name === undefined) return false;
    return true;
};

const emailIsValid = (email) => {
    if (email === undefined || !constants.emailValidator.test(email)) return false;
    return true;
};

const emailIsUnique = async (email) => {
    const userAlreadyExists = await userModel.getUserByEmail(email);    
    if (userAlreadyExists) return false;
    return true;
};

const passwordIsValid = (password) => {
    if (password === undefined) return false;
    return true;
};

const createUser = async (name, email, password) => {
    if (!nameIsValid(name) || !emailIsValid(email) || !passwordIsValid(password)) {
        return { error: {
                message: constants.invalidEntries,
                status: constants.BAD_REQEUST,                
            },            
        };
    }
    
    if (!await emailIsUnique(email)) {
        return { error: {
            message: constants.emailAlreadyRegistered,
            status: constants.CONFLICTS,  
        } };
    }

    const newUser = await userModel.create(name, email, password, constants.user);
    return newUser;
};

module.exports = {
    createUser,
};