const statusCodes = require('./statusCodes');

const validIngredients = (ingredients) => {
  if (!ingredients || ingredients.length === 0) throw statusCodes.invalidData;
  return true;
};

module.exports = validIngredients;
