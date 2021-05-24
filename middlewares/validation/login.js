const rescue = require('express-rescue');
const { validation } = require('../../service');

module.exports = rescue(async (req, _res, next) => {
    const { email, password } = req.body;
    validation.login.password(password);
    validation.login.email(email);
    next();
});
