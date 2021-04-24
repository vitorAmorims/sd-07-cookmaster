const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const getRecipesList = async () => connection().then((db) => db.collection('recipes'));

const addRecipe = async (id, name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ id, name, ingredients, preparation }));

const getRecipes = async () => connection().then((db) => db.collection('recipes').find().toArray());

const checkForRecipeId = async (id) => getRecipesList()
  .then((recipes) => recipes.findOne({ _id: ObjectId(id) }));

const getRecipeById = async (id) =>
  connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const updateRecipe = async (id, name, ingredients, preparation) => {
  connection()
  .then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id)},
    {$set: {name, ingredients, preparation}}
  ));
  return { _id: id, name, ingredients, preparation };
}

module.exports = {
  addRecipe,
  getRecipes,
  checkForRecipeId,
  getRecipeById,
  updateRecipe,
};
