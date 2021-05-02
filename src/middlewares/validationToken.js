const jwt = require('jsonwebtoken');

const tokenAuthorization = async (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'senhaMuitoSecrataParaDecodificacao';

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, secret);
    // console.log(req);
    req.user = payload;
    // console.log(req.user);
    } catch (error) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    next();
  };

module.exports = tokenAuthorization;
