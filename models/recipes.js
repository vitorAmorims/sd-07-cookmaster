const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (recipeData) => connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeData }))
    .then((recipeAdd) => ({ recipe: { _id: recipeAdd.insertedId, ...recipeData } }));

const updateRecipe = ({ ...recipeData }) => {
  const { id } = recipeData;
  return connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, { ...recipeData }))
    .then(() => ({ _id: ObjectId(id), ...recipeData }))
    .catch((err) => console.log('catch do updateRecipe: ', err.message));
};

const deleteRecipe = (id) => connection()
    .then((db) => db.collection('recipes')
      .deleteOne({ _id: ObjectId(id) }));

const getAllRecipes = () => connection()
    .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = (id) => connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
    .catch((err) => console.log(err));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};