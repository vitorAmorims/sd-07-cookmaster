const jwt = require('jsonwebtoken');
const loginModel = require('../Login/loginModels');

const secret = 'TokenDoProjetoCookmaster';
const UNAUTHORIZED = 401;

const validadeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw Error('missing auth token');
    
    const decoded = jwt.verify(token, secret);
    const user = await loginModel.findUser(decoded.email);
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'missing auth token') {
      return res.status(UNAUTHORIZED).json({ message: error.message });
    }
    res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validadeToken,
};
