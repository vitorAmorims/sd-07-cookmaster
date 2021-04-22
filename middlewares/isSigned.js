const { CONFLICT } = require('../utils/statusCode.json');
const UserModel = require('../models/UserModel');

const isSigned = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.getByEmail(email);
  const err = new Error();
  err.message = 'Email already registered';
  if (user) {
    res.status(CONFLICT).json(err);
    return next(err);
  }
  next();
};

module.exports = isSigned;
