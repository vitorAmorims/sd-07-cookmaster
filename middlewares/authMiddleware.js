const { tokenIsValid } = require('../services/authTokenService');

const authMiddleware = async (req, res, next) => {
  const token = await req.headers.authorization;
  const { password } = req.body;
  if (token === undefined) {
    return next({ status: 401, message: 'jwt malformed', code: 'invalid_data' });
  }
  if (tokenIsValid(token, password)) {
    return next();
  }
  console.log("passei aqui");
  return next({ status: 401, message: 'jwt malformed', code: 'invalid_data' });
};

module.exports = authMiddleware;