const { UNAUTHORIZED } = require('../controllers/status');

function hasValidBody(body) {
  return !!body.email && !!body.password && /\w+@+\w+.com/.test(body.email);
}

module.exports = (req, res, next) => {
  if (!hasValidBody(req.body)) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }

  next();
};
