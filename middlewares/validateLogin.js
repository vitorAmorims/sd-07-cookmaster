const Users = require('../models/usersModels');

const validateLogin = async (req, _res, next) => {
  const { email, password } = req.body;
  const emailCheck = await Users.checkForUserEmail(email);
  if (!email || !password) {
    return next({ status: 401, message: 'All fields must be filled', code: 'invalid_data' });
  }
  if (!emailCheck) {
    return next({ status: 401, message: 'Incorrect username or password', code: 'invalid_data' });
  }
  const passwordCheck = emailCheck.password;
  if (!passwordCheck) {
    return next({ status: 401, message: 'Incorrect username or password', code: 'invalid_data' });
  }
  return next();
};

module.exports = validateLogin;