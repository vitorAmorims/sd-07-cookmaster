const rescue = require('express-rescue');
const { validation } = require('../../service');

module.exports = rescue(async (req, _res, next) => {
    const { name, email, password } = req.body;
    validation.user.name(name);
    validation.user.password(password);
    validation.user.email(email);
    await validation.user.emailExists(email);
    next();
});
