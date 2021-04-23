const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = '1a2b3c4d5e6f6g7h8i9j';

const validateToken = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next({ status: 401, message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);

    const user = await userModel.findByEmail(decoded.email);
    if (!user) return next({ status: 401, message: 'Erro ao procurar usuário do token.' });

    req.email = decoded.email;
    const { _id } = decoded;
    req.userId = _id;

    next();
  } catch (error) {
    return next({ status: 401, message: error.message });
  }
};

module.exports = validateToken;
