const jwt = require('jsonwebtoken');

const secret = 'mysecretjtw';

const tokenValidationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(token, secret);
    console.log('token decodificado', decoded.data);
  
    req.user = decoded.data;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = tokenValidationMiddleware;