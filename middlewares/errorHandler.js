const { httpStatus, errorMessages } = require('../utils');

const { USERNAME_OR_PASSWORD, FIELDS_FILLED, INVALID_TOKEN, MISSING_AUTH } = errorMessages;
const unauthorized = [USERNAME_OR_PASSWORD, FIELDS_FILLED, INVALID_TOKEN, MISSING_AUTH];

function status(message) {
   switch (message) {
    case errorMessages.EMAIL_REGISTERED:
      return httpStatus.CONFLICT;
    case errorMessages.INVALID_ENTRIES:
      return httpStatus.BAD_REQUEST;
    case errorMessages.NOT_FOUND:
      return httpStatus.NOT_FOUND;
    case errorMessages.NOT_ADMIN:
      return httpStatus.FORBIDDEN;
    default:
      return null;
  }
}

module.exports = ({ message }, _req, response, _next) => {
  if (unauthorized.includes(message)) {
    response.status(httpStatus.UNAUTHORIZED).json({ message });
  } else {
    response.status(status(message)).json({ message });
  }
};
