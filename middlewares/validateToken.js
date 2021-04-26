const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const CustomError = require('./CustomError');

const secret = 'abc';

const validateToken = async (req, _res, next) => {
    const token = req.headers.authorization;
    if (!token) throw CustomError(StatusCodes.UNAUTHORIZED, 'Token não encontrado ou informado');

    try {
        const decoded = jwt.verify(token, secret);

        const user = await userModel.findUser(decoded.data);
        if (!user) {
            throw CustomError(StatusCodes.UNAUTHORIZED, 'Erro ao procurar usuario do token.');
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = validateToken;