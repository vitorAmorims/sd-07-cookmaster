const recipeModel = require('../models/recipiesModel');
// validação feita om ajuda dos videos do conteudo da aulda do dia 27.2

const errors = {
  noNameIngredientOrPrepField: 'Invalid entries. Try again.',
  existentEmail: 'Email already registered',
  recipeNotFound: 'recipe not found',
};

const badRequest = 400;
const notFound = 404;

const validateNameIngrPrep = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { code: badRequest, message: errors.noNameIngredientOrPrepField };
  }
  return {};
};

const validateId = async (id) => {
  const getId = await recipeModel.getById(id);
  if (!getId) return { code: notFound, message: errors.recipeNotFound };

  return {};
};

module.exports = {
  validateNameIngrPrep,
  validateId,
};
