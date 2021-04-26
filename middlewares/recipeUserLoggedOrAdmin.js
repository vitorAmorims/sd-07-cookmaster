const { tokenIsValid } = require('../services/authTokenService');

const recipeUserLoggedOrAdmin = async (req, _res, next) => {
  const token = await req.headers.authorization;
  if (token === undefined) {
    return next({ status: 401, message: 'missing auth token', code: 'invalid_data' });
  }
  if (tokenIsValid(token)) {
    return next();
  }
  return next({ status: 401, message: 'missing auth token', code: 'invalid_data' });
};

module.exports = recipeUserLoggedOrAdmin;