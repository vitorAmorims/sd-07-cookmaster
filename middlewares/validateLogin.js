const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/userModel');
const CustomError = require('./CustomError');

const validateLogin = async (res, req, _next) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
      throw CustomError(StatusCodes.UNAUTHORIZED, 'É necessário usuário e senha para fazer login');
    }
        const user = await userModel.findUser(username);
        if (!user) return res.status(401).json({ message: 'Usuário não existe' });
        if (password !== user.password) throw CustomError(StatusCodes.UNAUTHORIZED, 'Senha inválida');
        _next();
    } catch(err) {
        _next(err);
    }
};

module.exports = validateLogin;