const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statusCode.json');
const UserModel = require('../models/UserModel');

const secret = 'OverheadthealbatrossHangsmotionlessupontheairAnddeepbeneaththerollingwaves';

const tokenValidate = async (req, res, next) => {
  const { authorization: token } = req.headers;
  const err = new Error();
  err.message = 'Incorrect username or password';
  if (!token) {
    res.status(UNAUTHORIZED).json(err);
    return next(err);
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.getByEmail(decoded.data);
    req.user = user;
  } catch (error) {
    err.message = 'jwt malformed';
    res.status(UNAUTHORIZED).json(err);
    return next(error);
  }
  next();
};

module.exports = tokenValidate;
