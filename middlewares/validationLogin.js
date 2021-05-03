const { validationResult } = require('express-validator');

const validationLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(401).json({ message: 'Incorrect username or password' });
    }
    next();
};

module.exports = validationLogin;