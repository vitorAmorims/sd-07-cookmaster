const jwt = require('jsonwebtoken');

const { OK } = require('../config/httpCodes');
// const { findUser } = require('../models/UsersModels');

// const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const secret = 'NelMezzoDelCamminDiNostraVita';

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const jwtConfig = {
      expiresIn: 60 * 5,
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    return res.status(OK).json(token);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  login,
};