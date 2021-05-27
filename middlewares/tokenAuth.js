const { findUserByEmail } = require('../models/users');
const { code, message } = require('../helpers/messages');
const { verifyToken } = require('../helpers/token');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(code[41]).json({ message: message.tokenMissing });
    }
    const userLogged = verifyToken(token);
    const user = await findUserByEmail(userLogged.email);
    
    if (user) next();
  } catch (error) {
    res.status(code[41]).json({ message: message.tokenMalformed });
  }
};