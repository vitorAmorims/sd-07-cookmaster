const { ObjectId } = require('mongodb');
const connect = require('../config/connect');

const createRecipe = async (recipe, { _id }) => 
  connect().then((db) => db.collection('recipes').insertOne({ ...recipe, userId: _id }))
    .then((response) => response.ops[0])
    .catch((error) => error.message);

const getAllRecipes = async () => 
  connect().then((db) => db.collection('recipes').find().toArray())
    .catch((error) => error.message);

const getRecipesById = async (id) => 
  connect().then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .catch((error) => error.message);

const updateRecipe = async (id, name, ingredients, preparation) =>
  connect().then((db) => db.collection('recipes').updateOne(
    { _id: id },
    { $set: { name, ingredients, preparation } },
    ))
      .catch((error) => error.message);

const deleteRecipe = async (id) => 
    connect().then((db) => db.collection('recipes').deleteOne({ _id: id }))
      .catch((error) => error.message);

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
};