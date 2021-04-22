const jwt = require('jsonwebtoken');

const secret = 'aoifuh98e3our-031irkffkmc';

function verifyJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ auth: false, message: 'missing auth token' });
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ auth: false, message: 'jwt malformed' });
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  verifyJWT,
};