const { BAD_REQUEST } = require('../utils/statusCode.json');

const nameValidate = (req, res, next) => {
  const { name, email, password } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (!name || !email || !password || !emailRegex.test(email)) {
    const err = new Error();
    err.message = 'Invalid entries. Try again.';
    res.status(BAD_REQUEST).json(err);
    return next(err);
  }
  next();
};

module.exports = nameValidate;
