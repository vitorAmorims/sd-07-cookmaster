const usersModel = require('../models/usersModel');

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const user = await usersModel.getByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = loginMiddleware;