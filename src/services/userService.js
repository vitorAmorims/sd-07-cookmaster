const { findUserByEmail } = require('../models/userModel');

const validateNullCamps = (name, email, password) => {
    const regex = /\S+@\S+\.\S+/;
    if (name === undefined || email === undefined || password === undefined || !regex.test(email)) {
        return {
            message: 'Invalid entries. Try again.',
            status: 400,
        };
    }
    return {};
};

const createUserValidation = async (name, email, password) => {
    let validationObject = {};
    validationObject = validateNullCamps(name, email, password);
    if (validationObject.message) {
        return validationObject;
    }
    const userByEmail = await findUserByEmail(email);
    console.log('name: ', name, 'email: ', email, 'password: ', password);
    console.log('Usuario encontrado', userByEmail);
    if (userByEmail !== null) {
        validationObject = {
            message: 'Email already registered',
            status: 409,
        };
    }
    console.log('Erro gerado: ', validationObject);
    return validationObject;
};

module.exports = {
    createUserValidation,
};