const httpStatus = require('../../helpers/httpStatus');

module.exports = {
  validateCreateRecipe: (request, response, next) => {
    const { name, ingredients, preparation } = request.body;
    const { authorization } = request.headers;
    if (!name || !ingredients || !preparation) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: 'Invalid entries. Try again.' });
    }
    if (!authorization) {
      return response.status(httpStatus.UNAUTHORIZED).json({ message: 'missing auth token' });
    }
    next();
  },
};