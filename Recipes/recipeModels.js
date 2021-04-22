const { ObjectId } = require('mongodb');
const conn = require('../connection');

const createRecipe = async (name, ingredients, preparation, _id) => {
  const addRecipe = await conn().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }));

  return { name, ingredients, preparation, userId: _id, _id: addRecipe.insertedId };
}; // req. 3

const getAllRecipes = async () => {
  const allRecipes = await conn().then((db) => db.collection('recipes').find().toArray());

  return allRecipes;
}; // req. 4

const getRecipeById = async (id) => {
  const recipe = await conn().then((db) => db.collection('recipes').findOne(ObjectId(id)));

  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
