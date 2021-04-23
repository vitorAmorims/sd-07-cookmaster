const { findUserByEmail } = require('../models/userModel');

const validateNullCamps = (name, email, password) => {
    const regex = /\S+@\S+\.\S+/;
    if (!name || !email || !password || !regex.test(email)) {
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
    // const userByEmail = await findUserByEmail(email);
    // console.log(userByEmail);
    // if (userByEmail !== null) {
    //     validationObject = {
    //         message: 'Email already registered',
    //         status: 409,
    //     };
    // }
    return validationObject;
};

module.exports = {
    createUserValidation,
};