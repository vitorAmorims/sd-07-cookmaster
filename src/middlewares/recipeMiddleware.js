const { BAD_REQUEST } = require('../controllers/status');

function hasValidBody(body) {
  return !!body.name && !!body.ingredients && !!body.preparation;
}

module.exports = (req, res, next) => {
  if (!hasValidBody(req.body)) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};
