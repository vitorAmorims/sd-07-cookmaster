const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/userModel');
const CustomError = require('./CustomError');

function validateBody(name, email, password) {
    if (!name || !email || !password) {
        throw new CustomError(StatusCodes.BAD_REQUEST, 'Invalid entries. Try again.');
    }
}
const validateUser = async (req, _res, next) => {
    try {
        const { name, email, password } = req.body;
        validateBody(name, email, password);
        const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!regexEmail.test(email)) {
            throw new CustomError(StatusCodes.BAD_REQUEST, 'Invalid entries. Try again.');
        }
        if (await userModel.findUser(email)) {
            throw new CustomError(StatusCodes.CONFLICT, 'Email already registered');
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validateUser;