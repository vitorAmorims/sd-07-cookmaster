const jwt = require('jsonwebtoken');
const service = require('../services/userService');
const { invalidToken } = require('../messages');

const secret = 'minhasenha';

const validateToken = async (request, response, next) => {
  const { authorization: token } = request.headers;
  if (!token) {
    return response.status(401).json({ message: invalidToken });
  }

  try {
    const decode = jwt.verify(token, secret);
    const user = await service.findUserByEmail(decode.email);

    if (!user) {
      return response.status(401).json({ message: 'usuário não encontrado' });
    }

    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }  
};

module.exports = validateToken;