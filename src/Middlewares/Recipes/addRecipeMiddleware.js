const CODE_ERROR = 400;
const CODE_TOKEN_ERROR = 401;
const MESSAGE_ERROR = 'Invalid entries. Try again.';
const INVALID_TOKEN = 'jwt malformed';
const REGEX_TOKEN = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

const verifyFilds = (name, ing, prep) => {
  if (!name || !ing || !prep) {
    return true;
  }
};

const validationToken = (token) => {
    if (!REGEX_TOKEN.test(token)) {
        return true;
    }
};

const addRecipeMiddleware = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  
  if (validationToken(authorization)) {
    return res.status(CODE_TOKEN_ERROR).json({ message: INVALID_TOKEN });
  }
  if (verifyFilds(name, ingredients, preparation)) {
     return res.status(CODE_ERROR).json({ message: MESSAGE_ERROR });
  }
  next();
};

module.exports = {
  addRecipeMiddleware,
};
