const connect = require('../config/connect');

const createRecipe = async (recipe, { _id }) => 
  connect().then((db) => db.collection('recipes').insertOne({ ...recipe, userId: _id }))
    .then((response) => response.ops[0])
    .catch((error) => error.message);

const getAllRecipes = async () => 
  connect().then((db) => db.collection('recipes').find().toArray())
    .catch((error) => error.message);

module.exports = {
  createRecipe,
  getAllRecipes,
};