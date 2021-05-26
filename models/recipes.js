const connection = require('./connection');

const createRecipe = (recipeData) => connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeData }))
    .then((recipeAdd) => ({ recipe: { _id: recipeAdd.insertedId, ...recipeData } }));

const getAllRecipes = () => connection()
    .then((db) => db.collection('recipes').find().toArray());

// const getRecipeById = async (email) => connection()
//     .then((db) => db.collection('users').findOne({ _id: ObjectId(id) }));

module.exports = {
  createRecipe,
  getAllRecipes,
  // getRecipeById,
};