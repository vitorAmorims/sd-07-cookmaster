const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const postNewRecipe = async (name, ingredients, preparation, id) => {
  const db = await connect();
  return db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId: id,
  });
};

const getRecipeByName = async (name) => {
  const db = await connect();
  return db.collection('recipes').findOne({ name });
};

const allRecipes = async () => {
  const db = await connect();
  return db.collection('recipes').find().toArray();
};

const getRecipeById = async (id) => {
  const db = await connect();
  if (!ObjectId.isValid(id)) return null;
  return db.collection('recipes').findOne({ _id: ObjectId(id) });
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  const db = await connect();
  db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
};

module.exports = {
  postNewRecipe,
  getRecipeByName,
  allRecipes,
  getRecipeById,
  updateRecipeById,
};
