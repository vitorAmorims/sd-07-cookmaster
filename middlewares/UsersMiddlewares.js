const validateEmail = require('../utils/validateEmail');

const existAllFields = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

module.exports = {
  existAllFields,
  login,
};