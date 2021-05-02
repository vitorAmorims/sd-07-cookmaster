const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

const secret = 'hakunamatata';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const login = await user.getUserEmail(email);

  if (!login || login.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: login }, secret, jwtConfig);
  return res.status(200).json({ token });
};
  module.exports = {
    loginUser,
  };
