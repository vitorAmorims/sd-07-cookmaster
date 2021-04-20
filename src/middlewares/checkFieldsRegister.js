const codes = require('../services/codes');

const checkFieldsRegisterMiddleares = (req, res, next) => {
    const { body } = req;
    if (!body.name || !body.email || !body.password) {
        return res.status(codes.badRequest).json({
            message: 'Invalid entries. Try again.',
        });
    }
    next();
};

module.exports = checkFieldsRegisterMiddleares;
