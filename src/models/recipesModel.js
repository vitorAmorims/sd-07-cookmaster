const { ObjectID } = require('bson');
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

const getRecipesById = async (id) => {
  const recipeFound = await connection()
    .then((db) => db.collection('recipes')
      .findOne({ _id: ObjectID(id) }));
  return recipeFound;
};

module.exports = {
  creatRecipe,
  getAllRecipes,
  getRecipesById,
};
