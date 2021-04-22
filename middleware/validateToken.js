/* const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

const secret = 'minhasenhaforte';

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    // const decoded = jwt.verify(req.headers.authorization, secret);
    if (true) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuario do token.' });
    }

    // req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
 */
