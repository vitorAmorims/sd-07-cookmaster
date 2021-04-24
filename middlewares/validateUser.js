const Users = require('../models/usersModels');

const validateUser = async (req, _res, next) => {
  const {name, email, password, role} = req.body;
  const regex = /\S+@\S+\.\S+/;
  const emailCheck = await Users.checkForUserEmail(email);
  if (!name || !email || !password || !regex.test(email) ) {
    return next({ status: 400, message: 'Invalid entries. Try again', code: 'invalid_data'});
  }
  if ( emailCheck ) {
    return next({ status: 409, message: 'Email already registered', code: 'invalid_data'});
  }
  return next();
};

module.exports = validateUser;