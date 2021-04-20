const status = require('../status');

const ENTRIES = 'Invalid entries. Try again.';

const EMAIL = /^([a-zA-Z0-9_-]+)@+\w+.com/;

const checkUser = (request, response, next) => {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    return response.status(status.BAD_REQUEST)
      .json({ message: ENTRIES });
  }
  if (!EMAIL.test(email)) {
    return response.status(status.BAD_REQUEST)
      .json({ message: ENTRIES });
  }
  next();
};

module.exports = {
  checkUser,
};