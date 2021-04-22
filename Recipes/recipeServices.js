const { ObjectId } = require('mongodb');

const validadeRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return 'Invalid entries. Try again.';

  return undefined;
};

const validadeId = (id) => {
  if (!ObjectId.isValid(id)) return 'recipe not found';

  return undefined;
};

module.exports = {
  validadeRecipe,
  validadeId,
};