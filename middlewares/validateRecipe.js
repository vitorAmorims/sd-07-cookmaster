const { StatusCodes } = require('http-status-codes');
const CustomError = require('./CustomError');

const validateRecipe = async (req, _res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        if (!name || !ingredients || !preparation) {
            throw new CustomError(StatusCodes.BAD_REQUEST, 'Invalid entries. Try again.');
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = validateRecipe;