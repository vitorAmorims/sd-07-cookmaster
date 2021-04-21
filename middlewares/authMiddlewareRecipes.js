const jwt = require('jsonwebtoken');

const unauthorized = 401;

const JWT_SECRET = 'meuSegredo';

const authMiddlewareRecipes = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(unauthorized).json({
      message: 'missing auth token',
    });
  }
  try {
  const payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;
  } catch (error) {
    return res.status(unauthorized).json({
      message: 'jwt malformed',
    });
  }
  next();
};

module.exports = authMiddlewareRecipes;
