const { errorMessage, BAD_REQUEST } = require('../config/httpCodes');

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const validateObligatoryFields = (req, res, next) => {
  const { name, email, password } = req.body;
  const error = errorMessage;
  error.message = 'Invalid entries. Try again.';

  if (
    !name
    || !email
    || !password
    || !emailRegex.test(email)
  ) return res.status(BAD_REQUEST).json(error);
  next();
};

module.exports = validateObligatoryFields;
