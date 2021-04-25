const jwt = require('jsonwebtoken');
const authConfig = require('../Config/auth.json');
const modelUser = require('../Model/UserModel');
const codes = require('../Controller/Status');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(codes.ERRORUPDATE).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, authConfig.secret);
    const user = await modelUser.getUserById(decoded.id);
    if (!user) {
      res.status(codes.ERRORUPDATE).json({ message: 'missing auth token' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(codes.ERRORUPDATE).json({ message: error.message });
  }
};

module.exports = validateToken;