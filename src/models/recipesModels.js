const { ObjectId } = require('mongodb');
const connect = require('../config/connection');
// const { getRecipeById } = require('../controllers/recipesControllers');

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
  return db.collection('recipes').findOne(ObjectId(id));
};

module.exports = {
  postNewRecipe,
  getRecipeByName,
  allRecipes,
  getRecipeById,
};
