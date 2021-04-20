const status = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

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

const validEmailFormat = (email) => {
  const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (regexEmail.test(email)) {
    return true;
  }
  return false;
};

module.exports = { 
  status,
  validEmailFormat,
  errorMessages,
};