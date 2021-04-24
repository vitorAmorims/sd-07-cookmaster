// const bcrypt = require('bcrypt-nodejs');
const { UNAUTHORIZED } = require('../utils/statusCode.json');
const UserModel = require('../models/UserModel');

const authValidate = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.getByEmail(email);
  if (!user) {
    const err = new Error();
    err.message = 'Incorrect username or password';
    res.status(UNAUTHORIZED).json(err);
    return next(err);
  }
  // const isMatch = bcrypt.compareSync(password, user.password);
  const isMatch = password === user.password;
  if (!isMatch) {
    const err = new Error();
    err.message = 'Incorrect username or password';
    res.status(UNAUTHORIZED).json(err);
    return next(err);
  }
  next();
};

module.exports = authValidate;
