const Joi = require('joi');

const validRecipe = (data) => 
  Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(data);

module.exports = { validRecipe };