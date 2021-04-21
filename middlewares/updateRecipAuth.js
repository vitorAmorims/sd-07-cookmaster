const jwt = require('jsonwebtoken');
const usersModels = require('../models/usersModels');

const secret = 'secret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    const user = await usersModels.findByEmail(decodedToken.data.email);
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    const { _id } = user;
    req.body.userId = _id;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};