const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SECRET = '1234567890';

class NewError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const throwError = (error, message, code) => {
  if (error) {
    throw new NewError(message, code);
  }
};

module.exports = {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
  FORBIDDEN,
  SECRET,
  throwError,
};
