const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'cookmaster';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }

    const user = await usersModel.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const jwtConfig = { expiresIn: 60 * 10, algorithm: 'HS256' };
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  login,
};
