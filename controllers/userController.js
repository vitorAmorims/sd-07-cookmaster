const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const connection = require('../config/conn');

const secret = 'abc';
const HTTP200 = 200;
const HTTP201 = 201;
const HTTP401 = 401;
const HTTP500 = 500;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.createUser(name, email, password);        
    return res.status(HTTP201).json(result);
  } catch (err) {
    return res.status(HTTP500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await connection().then((db) =>
    db.collection('users').findOne({ email }));    
    if (password !== 'admin' && password.length < 8) {
      return res.status(HTTP401).json({ message: 'Incorrect username or password' });
    }
    if (user.password !== password) {
      return res.status(HTTP401).json({ message: 'Incorrect username or password' });
    }
    const jwtConfig = { expiresIn: 60 * 60, algorithm: 'HS256' };    
    const { _id, role } = user;
    const token = jwt.sign({ id: _id, role }, secret, jwtConfig);
    return res.status(HTTP200).json({ token });
  } catch (err) {
    return res.status(HTTP500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};