const statusMessages = require('../utils/statusMessages');
const statusCodes = require('../utils/statusCodes');
const { USERNAME_OR_PASSWORD_INCORRECT, FIELDS_FILLED, INVALID_TOKEN } = statusMessages;
const unauthorized = [USERNAME_OR_PASSWORD_INCORRECT, FIELDS_FILLED, INVALID_TOKEN];

module.exports = (error, _req, res, _next) => {
  if (error.message === statusMessages.INVALID_ENTRIES) {
    res.status(statusCodes.BAD_REQUEST)
      .send(error.message);
    return;
  }
  if (error.message === statusMessages.EMAIL_REGISTERED) {
    res.status(statusCodes.CONFLICT)
      .send(error.message);
    return;
  }
  if (unauthorized.includes(error.message)) {
    res.status(statusCodes.UNAUTHORIZED)
      .send(error.message);
    return;
  }
}

// Middleware estruturado junto com Rodolfo