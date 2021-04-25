const { validationResult } = require('express-validator');

const fieldValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    next();
};

module.exports = fieldValidator;