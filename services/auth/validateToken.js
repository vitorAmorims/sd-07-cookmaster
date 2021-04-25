const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const secret = 'tatranquilotafavoravel';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  
  try {
    if (!token) throw Error('missing token');
    const decoded = jwt.verify(token, secret);
    const user = await User.getUserByEmail(decoded.data);
    if (!user) throw Error('user not found');

    req.user = user;

    next();
  } catch (error) {
    if (error.message === 'missing token') {
      res.status(401).json({ message: error.message });
    }
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;