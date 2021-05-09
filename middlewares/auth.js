const jwt = require('jsonwebtoken');

const SECRET = 'Trybe2021';

const noSenseVerification = (token, method) => {
  if (!token && (method === 'PUT' || method === 'DELETE')) return true;

  return false;
};

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  const noSense = noSenseVerification(token, req.method);

  if (noSense) return res.status(401).json({ message: 'missing auth token' });
  if (!token) return res.status(401).json({ message: 'jwt malformed' });

  try {
    const data = jwt.verify(token, SECRET);

    req.user = { id: data.id, email: data.email, role: data.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
