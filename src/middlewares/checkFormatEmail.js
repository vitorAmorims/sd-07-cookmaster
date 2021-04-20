const codes = require('../services/codes');

const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/.test(email);

const checkFormatEmail = (req, res, next) => {
    const { email } = req.body;

    if (!validateEmail(email)) {
        res.status(codes.badRequest).json({
            message: 'Invalid entries. Try again.',
        });
    }
    next();
};
module.exports = checkFormatEmail;