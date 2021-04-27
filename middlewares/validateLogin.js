const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/userModel');
const CustomError = require('./CustomError');

function validateBody(email, password) {
    if (!email || !password) {
        throw new CustomError(StatusCodes.UNAUTHORIZED, 'All fields must be filled');
      }
}
const validateLogin = async (req, _res, next) => {
    try {
        const { email, password } = req.body;
        validateBody(email, password);
        const user = await userModel.findUser(email);
        if (!user) {
            throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect username or password');
        }
        if (password !== user.password) {
            throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect username or password');
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validateLogin;