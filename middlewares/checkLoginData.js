const status = require('../httpStatusCodes');

const checkLoginData = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(status.UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }

  next();
};

module.exports = checkLoginData;