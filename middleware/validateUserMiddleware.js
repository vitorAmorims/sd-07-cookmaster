const joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const validateUserMiddleware = async (req, _res, next) => {
  const userData = req.body;
    const validate = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }).validate(userData);
  try {
    if (validate.error) {
       return next(
        { status: StatusCodes.BAD_REQUEST, message: 'Invalid entries. Try again.' },
      ); 
    }
    next();
  } catch (error) {
    return null;
  }  
};

module.exports = validateUserMiddleware;