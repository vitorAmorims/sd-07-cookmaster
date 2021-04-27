const { verifyToken } = require('../helpers/authentication');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json('jwt malformed');
  }
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  validateToken,
};
