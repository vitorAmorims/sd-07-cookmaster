const { statusMessages, statusCodes } = require('../utils');

// const {
//   USERNAME_OR_PASSWORD_INCORRECT,
//   FIELDS_REQUIRED,
//   INVALID_TOKEN,
//   MISSING_AUTH,
//   NOT_FOUND,
//   FORBIDDEN,
// } = statusMessages;
// const unauthorized = [USERNAME_OR_PASSWORD_INCORRECT, FIELDS_REQUIRED, INVALID_TOKEN, MISSING_AUTH];

module.exports = (error, _req, res, _next) => {
  switch (error.message) {
    case statusMessages.INVALID_ENTRIES:
      res.status(statusCodes.BAD_REQUEST).send({ message: error.message });
      break;
    case statusMessages.EMAIL_REGISTERED:
      res.status(statusCodes.CONFLICT).send({ message: error.message });
      break;
    case statusMessages.NOT_FOUND:
      res.status(statusCodes.NOT_FOUND).send({ message: error.message });
      break;
    case statusMessages.FORBIDDEN:
      res.status(statusCodes.FORBIDDEN).send({ message: error.message });
      break;
    default:
      // console.log(error.message)
      res.status(statusCodes.UNAUTHORIZED).send({ message: error.message });
  }
};
  // if (unauthorized.includes(error.message)) {
  //   return res.status(statusCodes.UNAUTHORIZED).send({ message: error.message });
  // }

// Middleware estruturado junto com Rodolfo