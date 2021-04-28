const CODE_TOKEN_ERROR = 401;
const INVALID_TOKEN = 'jwt malformed';
const REGEX_TOKEN = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

const validationToken = (token) => {
  if (!REGEX_TOKEN.test(token)) {
    return true;
  }
};

const getAllRecipesMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && validationToken(authorization)) {
    res.status(CODE_TOKEN_ERROR).json({ message: INVALID_TOKEN });
  }

  next();
};

module.exports = {
  getAllRecipesMiddleware,
};
