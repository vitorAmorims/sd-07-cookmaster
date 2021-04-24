const jwt = require('jsonwebtoken');
const user = require('../models/users');

const secret = 'mypass';

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    const getUser = await user.getEmail(email);
    if (!getUser || getUser.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }
    const jwtConfig = {
      expiresIn: '10d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return res.status(200).json({ token });
};

module.exports = {
  loginUser,
};