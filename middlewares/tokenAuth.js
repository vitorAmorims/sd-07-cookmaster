const { code, message } = require('../helpers/messages');
const { verifyToken } = require('../helpers/token');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log('token', token);
    if (!token) {
      res.status(code[43]).json({ message: message.tokenMissing });
    }

    const userLogged = verifyToken(token);
    console.log('userLogged', userLogged);
    if (userLogged) next();
  } catch (error) {
    res.status(code[41]).json({ message: message.tokenMalformed });
  }
};