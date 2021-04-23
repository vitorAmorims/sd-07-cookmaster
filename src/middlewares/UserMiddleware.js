const httpStatus = require('../../helpers/httpStatus');

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  return regex.test(String(email).toLowerCase());
}

module.exports = {
  validateCreateUser: async (request, response, next) => {
    const { name, email, password } = request.body;
    if (!name || !email || !password || !validateEmail(email)) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Invalid entries. Try again.' });
    }
    next();
  },
};
