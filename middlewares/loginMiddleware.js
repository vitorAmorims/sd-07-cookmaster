const { validationResult } = require('express-validator');
const service = require('../services/userService');

const loginMiddleware = async (request, response, next) => {
  const errors = validationResult(request); 
  const { email, password } = request.body;
    
  if (!errors.isEmpty()) { 
    const { msg } = errors.array()[0];
    return response.status(401).json({ message: msg }); 
  }

  const user = await service.findUserByEmail(email);

  if (!user || user.password !== password) {
    return response
      .status(401)
      .json({ message: 'Usuário não existe ou senha inválida' });
  }

  next();
};

module.exports = loginMiddleware;