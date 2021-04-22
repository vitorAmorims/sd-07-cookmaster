const jwt = require('jsonwebtoken');
require('dotenv').config();
const usersModel = require('../models/usersModel');
const { OK } = require('../config/statusCode');

const { JWT_SECRET, JWT_EXPIRE, JWT_ALGORITHM } = process.env;

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    
    const { _id, role } = await usersModel.getUserEmail(email);
    const payload = { id: _id, email, role };
    const jwtConfig = { expiresIn: JWT_EXPIRE, algorithm: JWT_ALGORITHM };

    const token = jwt.sign(payload, JWT_SECRET, jwtConfig);

    return res.status(OK).json({ token });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  userLogin,
};
