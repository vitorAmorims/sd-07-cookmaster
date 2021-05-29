const jwt = require('jsonwebtoken');
const User = require('../../models/UserModel');
const { code, message } = require('../StatusCodes/index');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  try {
  const { authorization } = req.headers;
  if (!authorization) return res.status(code.unauthorized).json({ message: 'missing auth token' });

    const userData = jwt.verify(authorization, segredo);
    const { email, password } = userData.data;
    const user = await User.login(email, password);
    if (!user) return res.status(code.unauthorized).json(message.token_valid);

    req.user = userData.data;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};