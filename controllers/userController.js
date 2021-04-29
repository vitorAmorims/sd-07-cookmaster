const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'abc';

const createUser = (async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userModel.registerUser(name, email, password, 'user');
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
        const { _id, role } = user;
        const token = jwt
        .sign({ data: user.email, _id, role }, secret, jwtConfig);

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
});

const adminUser = (async (req, res, next) => {
    try {
        if (req.userRole === 'admin') {
            const { name, email, password } = req.body;
            const newUser = await userModel.registerUser(name, email, password, 'admin');
            if (!newUser) throw Error;
            return res.status(StatusCodes.CREATED).json({ user: newUser });
        } throw Error;
    } catch (error) {
        next({
            status: StatusCodes.FORBIDDEN,
            message: 'Only admins can register new admins',
          });
    }
});

module.exports = { createUser, loginUser, adminUser };
