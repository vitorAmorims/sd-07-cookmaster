const validRecipesData = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return ({
      code: 400,
      message: 'Invalid entries. Try again.',
    });
  }

  return {};
};

module.exports = {
  validRecipesData,
};