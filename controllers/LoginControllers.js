const jwt = require('jsonwebtoken');

const { OK } = require('../config/httpCodes');

const secret = 'NelMezzoDelCamminDiNostraVita';

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const jwtConfig = {
      expiresIn: '5d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    return res.status(OK).json({ token });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  login,
};