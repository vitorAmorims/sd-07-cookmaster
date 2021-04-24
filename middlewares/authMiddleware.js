const authMiddleware = async (req, res, next) => {
  const token = await req.headers.authorization;
  if (token === undefined) {
    return next({ status: 401, message: 'jwt malformed', code: 'invalid_data' });
  }
  return next();
};

module.exports = authMiddleware;