const { validationResult } = require('express-validator');
const service = require('../services/userService');
const { alreadyEmail } = require('../messages');

const userMiddleware = async (request, response, next) => {
  const errors = validationResult(request);
  const { email } = request.body;  
    
  if (!errors.isEmpty()) { 
    const { msg } = errors.array()[0];
    return response.status(400).json({ message: msg }); 
  }

  if (await service.findUserByEmail(email)) {
    return response.status(409).json({ message: alreadyEmail });
  }

  next();
};

module.exports = userMiddleware;