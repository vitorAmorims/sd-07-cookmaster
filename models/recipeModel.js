const connection = require('./connection');

const recipes = 'recipes';

const createRecipe = async (recipe) => connection()
  .then((db) => db.collection(recipes)
    .insertOne(recipe));

const findRecipeByName = async (name) => connection()
.then((db) => db.collection(recipes)
  .findOne({ name }));

module.exports = {
  createRecipe,
  findRecipeByName,
};
