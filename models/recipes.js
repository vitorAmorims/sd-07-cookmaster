const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (recipeData) => connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeData }))
    .then((recipeAdd) => ({ recipe: { _id: recipeAdd.insertedId, ...recipeData } }));

const getAllRecipes = () => connection()
    .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = (id) => connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
    .catch((err) => console.log(err));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};