const connection = require('../../configs');

const creatRecipe = async (recipe) => {
  const createdRecipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne(recipe));
  return createdRecipe.ops[0];
};

const getAllRecipes = async () => {
  const recipesListed = await connection()
    .then((db) => db.collection('recipes')
      .find().toArray());
  return recipesListed;
};

module.exports = {
  creatRecipe,
  getAllRecipes,
};
