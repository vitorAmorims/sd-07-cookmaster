const connection = require('../../config/connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection()
  .then((db) =>
  db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId }));
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const getAllRecipes = async () => {
  const recipes = await connection()
  .then((db) =>
    db.collection('recipes')
      .find().toArray());
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};