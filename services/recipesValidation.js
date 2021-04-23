const entriesMessage = { message: 'Invalid entries. Try again.' };

const entriesValidation = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
  throw new Error(JSON.stringify(entriesMessage));
  }
};

const recipesValidation = (reqRecipe) => {
  const { name, ingredients, preparation } = reqRecipe;
  
  entriesValidation(name, ingredients, preparation);
};

module.exports = {
  recipesValidation,
};
