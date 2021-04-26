const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'abc';

const createUser = (async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userModel.registerUser(name, email, password);
        if (!newUser) throw Error;
        return res.status(StatusCodes.CREATED).json({ user: newUser });
    } catch (error) {
        return next(error);
    }
});

const loginUser = (async (req, res, next) => {
    try {
        const { email } = req.body;
        const jwtConfig = {
            expiresIn: 60 * 5,
            algorithm: 'HS256',
        };

        const user = await userModel.findUser(email);
        const token = jwt.sign({ data: user.email }, secret, jwtConfig);

        res.status(200).json({ message: 'Login com sucesso', token });
    } catch (error) {
        next(error);
    }
});

module.exports = { createUser, loginUser };
