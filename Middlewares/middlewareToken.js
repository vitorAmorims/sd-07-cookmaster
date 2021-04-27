const jwt = require('jsonwebtoken');
const UserModels = require('../Models/UserModels');
const error = require('../error');

const secret = 'umasenhaqualquer';

const validateToken = async (req, res, next) => {
  try {
    const myToken = req.headers.authorization;
    if (!myToken) throw error.tokenMissing;
    const decodify = jwt.verify(myToken, secret);
    const user = await UserModels.getEmailUser(decodify.data.email);
    if (!user) {
      return res.status(401).json('jwt malformed');
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(err.code || 401).json({
      message: err.message,
    });
  }
};

module.exports = {
  validateToken,
}