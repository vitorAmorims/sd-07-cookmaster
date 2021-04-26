const Users = require('../models/usersModels');

const validateLogin = async (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ status: 401, message: 'All fields must be filled', code: 'invalid_data' });
  }
  const user = await Users.findUser(email);
  if (!user) {
    return next({ status: 401, message: 'Incorrect username or password', code: 'invalid_data' });
  }
  const passwordCheck = user.password;
  if (!passwordCheck) {
    return next({ status: 401, message: 'Incorrect username or password', code: 'invalid_data' });
  }
  return next();
};

module.exports = validateLogin;