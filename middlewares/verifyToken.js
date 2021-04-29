const jwt = require('jsonwebtoken');

const secret = 'abc';

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token provided.' });
  
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  } 
  
  next();
};

module.exports = verifyTokenMiddleware;
