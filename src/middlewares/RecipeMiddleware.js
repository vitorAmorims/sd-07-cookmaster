const httpStatus = require('../helpers/httpStatus');
const { validateToken } = require('../security/Authentication');

function validateInputs(name, ingredients, preparation) {
  if (!name || !ingredients || !preparation) {
    return false;
  }
  return true;
}

module.exports = {
  validateCreateRecipe(request, response, next) {
    const { name, ingredients, preparation } = request.body;
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(httpStatus.UNAUTHORIZED).json({ message: 'missing auth token' });
    }
    if (!validateInputs(name, ingredients, preparation)) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Invalid entries. Try again.' });
    }
    const validatedToken = validateToken(authorization);
    if (!validatedToken) {
      return response.status(httpStatus.UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
    next();
  },
  validateDeleteRecipe(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(httpStatus.UNAUTHORIZED).json({ message: 'missing auth token' });
    }
    next();
  },
};
