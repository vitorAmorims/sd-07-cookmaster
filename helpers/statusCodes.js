const { StatusCodes } = require('http-status-codes');

const invalidData = {
  isError: true,
  code: StatusCodes.BAD_REQUEST,
  message: { message: 'Invalid entries. Try again.' },
};

const userAlredyExists = {
  isError: true,
  code: StatusCodes.UNAUTHORIZED,
  message: { message: 'All fields must be filled' },
};

const loginUserAlredyVerify = {
  isError: true,
  code: StatusCodes.UNAUTHORIZED,
  message: { message: 'Incorrect username or password' },
};

const invalidToken = {
  isError: true,
  code: StatusCodes.UNAUTHORIZED,
  message: { message: 'jwt malformed' },
};

const ok = {
  code: StatusCodes.OK,
};

const created = {
  code: StatusCodes.CREATED,
};

const notFound = {
  isError: true,
  code: StatusCodes.NOT_FOUND,
  message: { message: 'recipe not found' },
};

const methodNotAllowed = {
  isError: true,
  code: StatusCodes.METHOD_NOT_ALLOWED,
};

const conflict = {
  isError: true,
  code: StatusCodes.CONFLICT,
  message: { message: 'Email already registered' },
};

const unprocessableEntity = {
  isError: true,
  code: StatusCodes.UNPROCESSABLE_ENTITY,
};

const serverError = {
  code: StatusCodes.INTERNAL_SERVER_ERROR,
};

const invalidTokenUpdateRecipe = {
  isError: true,
  code: StatusCodes.UNAUTHORIZED,
  message: { message: 'missing auth token' },
};

module.exports = {
  invalidData,
  userAlredyExists,
  invalidToken,
  ok,
  created,
  notFound,
  methodNotAllowed,
  conflict,
  unprocessableEntity,
  serverError,
  loginUserAlredyVerify,
  invalidTokenUpdateRecipe,
};
