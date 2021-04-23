const { findUserByEmail } = require('../models/userModel');

const emailExistsValidation = async (req, res, next) => {
    const { email } = req.body;
    const userByEmail = await findUserByEmail(email);
    if (userByEmail !== null) {
        return res.status(409).json({
            message: 'Email already registered',
        });
    }
    next();
};

module.exports = {
    emailExistsValidation,
};