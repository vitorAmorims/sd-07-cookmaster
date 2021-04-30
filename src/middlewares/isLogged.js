const jsonwebtoken = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const usersModel = require('../models/usersModel');

const SECRET_JWT = 'nobailenosehmidia';

const isLogged = async (req, res, next) => {
  const tokenJwt = req.headers.authorization;
  if (!tokenJwt) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'jwt malformed' });

  try {
    const { data: { email, password } } = jsonwebtoken.verify(tokenJwt, SECRET_JWT);
    const account = await usersModel.searchByAccount(email, password);
    if (!account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Usuário não encontrado' });
    }
    req.user = account;
    next();
  } catch ({ message }) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message });
  }
};

module.exports = isLogged;
