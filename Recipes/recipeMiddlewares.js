const jwt = require('jsonwebtoken');
const loginModel = require('../Login/loginModels');

const secret = 'TokenDoProjetoCookmaster';
const UNAUTHORIZED = 401;

const validadeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    console.log('decode', decoded);
    const user = await loginModel.findUser(decoded.email);
    console.log('user', user);
    req.user = user;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validadeToken,
};
