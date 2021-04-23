const { CONFLICT } = require('../utils/statusCode.json');
const UserModel = require('../models/UserModel');

const isSigned = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.getByEmail(email);
  if (user) {
    const err = new Error();
    err.message = 'Email already registered';
    res.status(CONFLICT).json(err);
    return next(err);
  }
  next();
};

module.exports = isSigned;
