const { ObjectId } = require('mongodb');
const conn = require('../config/conn');

const collection = 'recipes';
const addRecipe = async (name, ingredients, preparation, userId) => {
  const recipe = await conn().then((db) =>
    db.collection(collection).insertOne({ name, ingredients, preparation, userId }));

  return { recipe: { name, ingredients, preparation, userId, _id: recipe.insertedId } };
};

const getAllRecipes = async () => conn().then((db) =>
  db.collection(collection)
    .find()
    .toArray());

const getRecipeById = async (id) => {
  const result = await conn().then((db) =>
    db.collection(collection)
      .findOne({ _id: ObjectId(id) }));
  return result;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
};
