const { errorMessage, UNAUTHORIZED } = require('../config/httpCodes');

const validateObligatoryFields = async (req, res, next) => {
  const { email, password } = req.body;
  const error = errorMessage;
  error.message = 'All fields must be filled';

  if (
    !email
    || !password
  ) return res.status(UNAUTHORIZED).json(error);
  next();
};

module.exports = validateObligatoryFields;
