const httpStatus = require('../../helpers/httpStatus');
const { validateToken } = require('../security/Authentication');

module.exports = {
  validateCreateRecipe: (request, response, next) => {
    const { name, ingredients, preparation } = request.body;
    const { authorization } = request.headers;
    if (!name || !ingredients || !preparation) {
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
};