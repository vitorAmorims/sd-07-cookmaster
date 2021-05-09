const { StatusCodes } = require('http-status-codes');

const invalidData = {
  isError: true,
  code: StatusCodes.BAD_REQUEST,
  message: { message: 'Invalid entries. Try again.' },
};

const userAlredyExists = {
  isError: true,
  code: StatusCodes.UNAUTHORIZED,
  message: { message: 'Email already registered' },
};

const invalidToken = {
  isError: true,
  code: StatusCodes.UNAUTHORIZED,
  message: 'Token invalido',
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
  message: 'Página não encontrada!',
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
};
