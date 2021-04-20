const codes = require('../services/codes');

const checkFieldsRegisterMiddleares = (req, res, next) => {
    const { body } = req;
    if (!body.name || !body.ingredients || !body.preparation) {
        return res.status(codes.badRequest).json({
            message: 'Invalid entries. Try again.',
        });
    }
    next();
};

module.exports = checkFieldsRegisterMiddleares;