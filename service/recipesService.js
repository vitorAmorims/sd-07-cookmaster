const recipesModels = require('../models/recipes');

const getAll = async () => {
    const result = await recipesModels.getAll();
    return result;
  };

const recipes = async (name, ingredients, preparation) => {
    const nameExists = await recipesModels.findByName(name);

    if (nameExists) return false;

    const result = await recipesModels.recipes(name, ingredients, preparation);
    return result;
};

module.exports = { 
    getAll,
    recipes,
};