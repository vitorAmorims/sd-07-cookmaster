const { ObjectId } = require('mongodb');
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

const getRecipeById = async (id) => {
  const recipe = await connection()
    .then((db) =>
      db.collection('recipes')
        .findOne(ObjectId(id)));
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};