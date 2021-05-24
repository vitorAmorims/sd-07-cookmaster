const { httpStatus, errorMessages } = require('../utils');

const { USERNAME_OR_PASSWORD, FIELDS_FILLED, INVALID_TOKEN } = errorMessages;
const unauthorized = [USERNAME_OR_PASSWORD, FIELDS_FILLED, INVALID_TOKEN];
const conflict = errorMessages.EMAIL_REGISTERED;
const badRequest = errorMessages.INVALID_ENTRIES;

module.exports = ({ message }, _req, response, _next) => {
  if (message.includes(badRequest)) {
    response.status(httpStatus.BAD_REQUEST)
      .json({ message });
      return;
  } if (message.includes(conflict)) {
    response.status(httpStatus.CONFLICT)
      .json({ message });
      return;
  } if (unauthorized.includes(message)) {
    response.status(httpStatus.UNAUTHORIZED)
      .json({ message });
  }
};
