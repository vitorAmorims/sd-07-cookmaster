const { UNAUTHORIZED } = require('../utils/statusCode.json');

const loginValidate = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const err = new Error();
    err.message = 'All fields must be filled';
    res.status(UNAUTHORIZED).json(err);
    return next(err);
  }
  next();
};

module.exports = loginValidate;
