const userModel = require('../models/userModel');

const validateLogin = async (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next({ status: 401, message: 'All fields must be filled' });

  const user = await userModel.findByEmail(email);

  if (user === null) return next({ status: 401, message: 'Incorrect username or password' });
  
  if (password !== user.password) next({ status: 401, message: 'Incorrect username or password' });
  
  next();
};

module.exports = validateLogin;
