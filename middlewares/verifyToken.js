const jwt = require('jsonwebtoken');

const secret = 'abc';

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token provided.' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'jwt malformed' });    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });  
};

module.exports = verifyTokenMiddleware;
