const { validationResult } = require('express-validator');

const recipeMiddleware = async (request, response, next) => {
  const errors = validationResult(request);  
  console.log('middle: ', errors);
    
  if (!errors.isEmpty()) { 
    const { msg } = errors.array()[0];
    return response.status(400).json({ message: msg }); 
  }   

  next();
};

module.exports = recipeMiddleware;