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

const updateRecipe = async (name, ingredients, preparation, id) => {
  await connection()
    .then((db) =>
      db.collection('recipes')
        .updateOne({ _id: ObjectId(id) },
          { $set: { name, ingredients, preparation } }));
  const recipeUpdated = await connection()
    .then((db) =>
      db.collection('recipes')
        .findOne(ObjectId(id)));
  return recipeUpdated;
};

const deleteRecipe = async (id) => {
  await connection()
    .then((db) =>
      db.collection('recipes')
        .deleteOne({ _id: ObjectId(id) }));
  return true;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};