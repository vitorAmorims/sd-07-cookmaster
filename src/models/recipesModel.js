const { ObjectId } = require('mongodb');

const connection = require('../config/connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));

  return {
    _id: recipe.insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const getAllRecipes = async () => {
  const allRecipes = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return allRecipes;
};

const getRecipeById = async (id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await connection().then((db) =>
  db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
  return recipe;
};

const deleteRecipe = async (id) => {
  const recipe = await connection().then((db) =>
  db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) }));
  return recipe;
};

const postPhoto = async (id, path) => {
  const recipe = await connection().then((db) =>
  db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image: path } }));
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  postPhoto,
};
