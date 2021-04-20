const {
BadRequestException,
ConflictException,
NotFoundException,
UnauthorizedException,
} = require('../exception');

const {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
} = require('../exception/errorResponse');

const getErrorData = (err) => {
  if (err instanceof BadRequestException) {
    return BAD_REQUEST;
  }
  if (err instanceof ConflictException) {
    return CONFLICT;
  }
  if (err instanceof NotFoundException) {
    return NOT_FOUND;
  }
  if (err instanceof UnauthorizedException) {
    return UNAUTHORIZED;
  }
  return null;
};

const errorHandlerMiddleware = (err, _req, res, _next) => {
  if (err instanceof BadRequestException
      || err instanceof ConflictException
      || err instanceof NotFoundException
      || err instanceof UnauthorizedException) {
    const statusResponse = getErrorData(err).code;
    const errorResponse = { message: getErrorData(err).messages[`${err.message}`] };
    return res.status(statusResponse)
      .json(errorResponse);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = errorHandlerMiddleware;
