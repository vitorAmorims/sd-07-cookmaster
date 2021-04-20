const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = { code: 400, messages: { invalidEntries: 'Invalid entries. Try again.' } };
const NOT_FOUND = { code: 404, messages: { recipeNotFound: 'recipe not found' } };
const CONFLICT = { code: 409, messages: { emailRegistered: 'Email already registered' } };
const UNAUTHORIZED = {
  code: 401,
  messages: {
    missingToken: 'missing auth token',
    jwtMalformed: 'jwt malformed',
    invalidUser: 'Incorrect username or password',
    emptyFields: 'All fields must be filled',
  },
};

module.exports = {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    NOT_FOUND,
    CONFLICT,
    UNAUTHORIZED,
};
