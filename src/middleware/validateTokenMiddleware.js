const jwt = require('jsonwebtoken');
const usersModel = require('../model/usersModel');
const loginService = require('../service/loginService');

const { secret } = loginService;

const statusHttp = {
  C_401: 401,
};

const validateTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(statusHttp.C_401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersModel.findUser(decoded.data.email);
    if (!user) {
      return res.status(statusHttp.C_401).json({ message: 'missing auth token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(statusHttp.C_401).json({ message: error.message });
  }
};

module.exports = validateTokenMiddleware;