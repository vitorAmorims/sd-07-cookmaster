const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');
const { usersValidation } = require('../services/usersValidation');
const { loginValidation, passwordValidation } = require('../services/loginValidation');

const secret = 'abc';
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const reqUser = req.body;
        await usersValidation(reqUser);
        const newUser = await usersService.createUser(name, email, password);
        const { role, _id } = newUser;
        res.status(201).json({
            user: {
                name, 
                email,
                role,
                _id,
            },
        });
    } catch (err) {
        next(err);
    }
};

const createLogin = async (req, res, next) => {
    try {
        const reqLogin = req.body;
        const reqEmail = req.body.email;
        const reqPassword = req.body.password;
        await loginValidation(reqLogin);
        const login = await usersService.createLogin(reqEmail);
        const { _id, email, role, password } = login;
        const loginPassaword = password;
        passwordValidation(reqPassword, loginPassaword);
        const jwtConfig = { expiresIn: '600s', algorithm: 'HS256' };
        const token = jwt.sign({ data: [_id, email, role] }, secret, jwtConfig);
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};

module.exports = {
  createUser,
  createLogin,
};
