const { StatusCodes } = require('http-status-codes');
const { ObjectID } = require('mongodb');
const CustomError = require('./CustomError');

const validateId = (req, _res, next) => {
    try {
        const { id } = req.params;
        if (!ObjectID.isValid(id)) {
            throw new CustomError(StatusCodes.NOT_FOUND, 'recipe not found');
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = validateId;