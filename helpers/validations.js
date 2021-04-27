const Joi = require('joi');

const isUserValid = (object) => {
  const messageError = 'Invalid entries. Try again.';
  const dataSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).messages({
    'string.base': '{{ #label }} shoul\'be a type of "text"',
    'any.required': messageError,
    'string.email': messageError,
  });
  return dataSchema.validate(object);
};

const isLoginValid = (object) => {
  const dataSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).messages({
    'string.base': '{{ #label }} shoul\'be a type "string"',
    'any.required': 'All fields must be filled',
    'string.email': 'Incorrect username or password',
  });
  return dataSchema.validate(object);
};

const isRecipesValid = (object) => {
  const dataSchema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).messages({
    'string.base': '{{ #label }} shoul\'be a type of "character"',
    'any.required': 'Invalid entries. Try again.',
  });
  return dataSchema.validate(object);
};

module.exports = {
  isUserValid,
  isLoginValid,
  isRecipesValid,
};
