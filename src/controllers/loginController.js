const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'senhasecretashiii';

const validateEmail = (email, password) => {
  if (!email || !password) {
    return { message: 'All fields must be filled' };
  }
  return 'ok';
};
const validateUser = async (email, password) => {
  const user = await userModel.getByEmail(email);
  if (!user || user.password !== password || user.email !== email) {
    return { message: 'Incorrect username or password' };
  }
  return user;
};

const newLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isOk = validateEmail(email, password);
    if (isOk.message) {
      return res.status(401).json(isOk);
    }
    const user = await validateUser(email, password);
    if (user.message) {
      return res.status(401).json(user);
    }
    const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };
    const { _id, role } = user;
    const token = jwt.sign({ data: { email, _id, role } }, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = { newLogin };
