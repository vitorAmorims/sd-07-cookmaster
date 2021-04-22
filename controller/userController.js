// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv/config');
const User = require('../model/UserModel');
// const { UnprocessableException, NotFound } = require('../utils/errorHandler');

// const SUCCESS = 200;
// const { JWT_SECRET } = process.env;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const createUserController = async (req, res) => {
    try {
        const { name, email } = req.body;
        let { password } = req.body;

        const salt = bcrypt.genSaltSync(5);
        password = bcrypt.hashSync(password, salt);

        const newUser = await User.registerUser(name, email, password);
        if (!newUser) throw Error;

        res.status(CREATED).json({ user: newUser });
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'Error trying to save user.',
            error: error.message,
        });
    }
};

module.exports = {
    createUserController,
};
