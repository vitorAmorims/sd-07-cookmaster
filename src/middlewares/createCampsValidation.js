const { findUserByEmail } = require('../models/userModel');

const createCampsValidation = (req, res, next) => {
    const { name, email, password } = req.body;
        const regex = /\S+@\S+\.\S+/;
        if (!name || !email || !password || !regex.test(email)) {
            return res.status(400).json({
                message: 'Invalid entries. Try again.',
            });
        }
        next();
};

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

module.exports = { createCampsValidation, emailExistsValidation };
