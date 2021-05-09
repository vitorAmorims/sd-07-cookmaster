const recipesModels = require('../models/recipes');

const getAll = async () => {
    const result = await recipesModels.getAll();
    return result;
  };
const findByid = async (id) => {
    const result = await recipesModels.findByid(id);
    return result;
  };

 const updateRecipes = async (id, name, ingredients, preparation) => {
    const result = await recipesModels.updateRecipes(id, name, ingredients, preparation);
    return result;
  };

const recipes = async (name, ingredients, preparation, id) => {
    const nameExists = await recipesModels.findByName(name);

    if (nameExists) return false;

    const result = await recipesModels.recipes(name, ingredients, preparation, id);
    return result;
};

const deleteRecipes = async (id) => {
  const result = await recipesModels.deleteRecipes(id);
  return result;
};
 const editUpload = async (id, filename) => {
  await recipesModels.editUpload(id, filename);
  const result = await recipesModels.findByid(id);
  console.log('service', result);
  return {
    ...result, 
    image: `localhost:3000/images/${filename}`,

  };
 };

module.exports = { 
    getAll,
    findByid,
    updateRecipes,
    recipes,
    deleteRecipes,
    editUpload,
};