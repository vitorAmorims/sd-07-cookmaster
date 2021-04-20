const codes = require('../services/codes');

const checkFieldsMiddleares = (req, res, next) => {
    const { body } = req;
    if (!body.email || !body.password) {
        return res.status(codes.unauthorized).json({
            message: 'All fields must be filled',
        });
    }
    next();
};

module.exports = checkFieldsMiddleares;