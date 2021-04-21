const { BAD_REQUEST } = require('../helpers/status');

const userMiddleware = (req, res, next) => {
  const { name, email, password } = req.body;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !email || !password || !validEmail) {
    res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = userMiddleware;
