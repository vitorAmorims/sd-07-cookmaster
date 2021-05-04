const jwt = require('jsonwebtoken');
const service = require('../services/userService');
const { invalidToken, missingToken } = require('../messages');

const secret = 'minhasenha';
const validateToken = async (request, response, next) => {  
  const { authorization: token } = request.headers;
  let msg = invalidToken;
  if (['PUT', 'DELETE'].includes(request.method)) msg = missingToken;
  if (!token) {
    return response.status(401).json({ message: msg });
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