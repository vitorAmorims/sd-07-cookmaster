const statusMessages = require('../utils/statusMessages'); // criar index
const statusCodes = require('../utils/statusCodes');

const {
  USERNAME_OR_PASSWORD_INCORRECT,
  FIELDS_REQUIRED,
  INVALID_TOKEN,
  MISSING_AUTH, NOT_FOUND,
} = statusMessages;
const unauthorized = [USERNAME_OR_PASSWORD_INCORRECT, FIELDS_REQUIRED, INVALID_TOKEN, MISSING_AUTH];

module.exports = (error, _req, res, _next) => {
  if (error.message === statusMessages.INVALID_ENTRIES) {
    res.status(statusCodes.BAD_REQUEST)
      .send({ message: error.message });
    return;
  }
  if (error.message === statusMessages.EMAIL_REGISTERED) {
    res.status(statusCodes.CONFLICT).send({ message: error.message });
    return;
  }
  if (unauthorized.includes(error.message)) {
    res.status(statusCodes.UNAUTHORIZED).send({ message: error.message });
    return;
  }
  if (error.message === NOT_FOUND) {
    res.status(statusCodes.NOT_FOUND).send({ message: error.message });
  }
};

// Middleware estruturado junto com Rodolfo
