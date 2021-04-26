const { getRecipes } = require('../../model');
const { MISSING_RECIPES_DATA } = require('../servDictionary');

const getRecipeServ = async () => {
  const recipes = await getRecipes();
  return recipes.length > 0
    ? { recipes, status: 'OK' }
    : { status: MISSING_RECIPES_DATA };
};

module.exports = getRecipeServ;