const jwt = require('jsonwebtoken');

const unauthorized = 401;

const JWT_SECRET = 'meuSegredo';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(unauthorized).json({
      message: 'jwt malformed',
    });
  }
  try {
  const payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;
  console.log(req.user);
  } catch (error) {
    return res.status(unauthorized).json({
      message: 'jwt malformed',
    });
  }
  next();
};

module.exports = authMiddleware;
