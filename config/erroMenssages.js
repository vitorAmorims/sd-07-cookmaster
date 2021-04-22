const status = require('./status');

const errorMessages = {
  INVALID_ENTRIES: {
    isError: true,
    status: status.BAD_REQUEST,
    message: 'Invalid entries. Try again.',
  },
  EMAIL_ALREADY_REGISTERED: {
    isError: true,
    status: status.CONFLICT,
    message: 'Email already registered',
  },
  ALL_FIELDS_MUST_BE_FIELD: {
    isError: true,
    status: status.UNAUTHORIZED,
    message: 'All fields must be filled',
  },
  INCORRECT_USERNAME_OR_PASSWORD: {
    isError: true,
    status: status.UNAUTHORIZED,
    message: 'Incorrect username or password',
  },
  JWT_MALFORMED: {
    isError: true,
    status: status.UNAUTHORIZED,
    message: 'jwt malformed',
  },
  RECIPE_NOT_FOUND: {
    isError: true,
    status: status.NOT_FOUND,
    message: 'recipe not found',
  },
  MISSING_AUTH_TOKEN: {
    isError: true,
    status: status.UNAUTHORIZED,
    message: 'missing auth token',
  },
};

module.exports = errorMessages;