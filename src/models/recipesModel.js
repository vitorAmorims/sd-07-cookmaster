const { ObjectId } = require('mongodb');
const conn = require('../config/conn');

const createRecipe = async (name, ingredients, preparation, userId) => conn()
  .then(async (db) => {
    const recipe = await db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId,
    });
    return recipe.ops[0];
  });

const getAllRecipes = async () => conn()
  .then(async (db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => conn()
  .then(async (db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

// referencia para o findOneAndUpdate
// https://stackoverflow.com/questions/24747189/update-and-return-document-in-mongodb
const updateRecipe = async (name, ingredients, preparation, recipeId) => conn()
  .then(async (db) => {
    const recipeUpdated = await db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(recipeId) },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
    );
    return recipeUpdated.value;
  });

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};