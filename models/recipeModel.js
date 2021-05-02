const connection = require('./connection');

const recipes = 'recipes';

const createRecipe = async (recipe) => connection()
  .then((db) => db.collection(recipes)
    .insertOne(recipe));

const findRecipeByName = async (name) => connection()
.then((db) => db.collection(recipes)
  .findOne({ name }));

const getAllRecipes = async () => connection()
.then((db) => db.collection(recipes)
.find().toArray());

module.exports = {
  createRecipe,
  findRecipeByName,
  getAllRecipes,
};
