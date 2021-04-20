const Joi = require('joi');

const message = {
  invalidEntries: { message: 'Invalid entries. Try again.' },
  recipeNotFound: { message: 'recipe not found' },
};

const validRecipe = (data) => 
  Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(data);

module.exports = { validRecipe, message };