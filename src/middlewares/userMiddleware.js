const { BAD_REQUEST, CONFLICT } = require('../controllers/status');
const UserService = require('../services/UserService');

function hasValidBody(body) {
  return !!body.name && !!body.email && !!body.password && /\w+@+\w+.com/.test(body.email);
}

module.exports = async (req, res, next) => {
  if (!hasValidBody(req.body)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  const alreadyExists = await UserService.get(req.body.email);
  if (alreadyExists) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }

  next();
};
