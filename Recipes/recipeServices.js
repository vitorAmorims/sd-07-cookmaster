const validadeRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return 'Invalid entries. Try again.';

  return undefined;
};

module.exports = {
  validadeRecipe,
};