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
}; // req. 5

const updateRecipe = async (id, name, ingredients, preparation) => {
  await conn().then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

  return { _id: ObjectId(id), name, ingredients, preparation };
}; // req. 7

const deleteRecipe = async (id) => {
  await conn().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
