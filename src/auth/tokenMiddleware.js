const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const SECRET_PASS = 'marcelodossantos';
const SECONDS = 60;
const NUMBER = 5;

const tokenMiddleware = async (req, res) => {
  try {
    const user = await UserModel.findByEmail(req.body.email);
    const { email, _id, role } = user;

    const payload = {
      _id,
      email,
      role,
    };
    const jwtConfig = {
      expiresIn: SECONDS * NUMBER,
      algorithm: 'HS256',
    };
    const token = jwt.sign(payload, SECRET_PASS, jwtConfig);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ Internal_error: error.message });    
  }
};

module.exports = tokenMiddleware;
