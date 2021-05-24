const { httpStatus } = require('../utils');

module.exports = ({ message }, _req, response, _next) => {
  if (message.includes('Invalid entries')) {
    response.status(httpStatus.BAD_REQUEST)
    .json({ message });
  } else if (message.includes('already registered')) {
    response.status(httpStatus.CONFLICT)
    .json({ message });
  } else if (
    message.includes('Incorrect username or password') || message.includes('All fields must')
  ) {
    response.status(httpStatus.UNAUTHORIZED)
    .json({ message });
  }
};
