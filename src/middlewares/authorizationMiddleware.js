const jwt = require('jsonwebtoken');
const modelUsers = require('../models/modelUsers');

const UNAUTHORIZED = 401;
const secret = 'abc';

const authorizationMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  } else {
    try {
      const decoded = jwt.verify(token, secret);

      const user = await modelUsers.getUserByEmail(decoded.data.email);
      const { _id: id, role } = user;
      req.userId = id;
      req.role = role;

      next();
    } catch (error) {
      res.status(UNAUTHORIZED).json({ message: error.message });
    }
  }
};

module.exports = authorizationMiddleware;
