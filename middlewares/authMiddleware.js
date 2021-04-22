const jwt = require('jsonwebtoken');
const userModel = require('../routes/user/userModel');
const { UNAUTHORIZED } = require('../helpers/status');
const { invalidToken, missingToken } = require('../helpers/errorMessage');

const secret = 'manodoceumeajuda';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json(missingToken);
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userModel.getByEmail(decoded.email);

    if (!user) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json(invalidToken);
  }
};