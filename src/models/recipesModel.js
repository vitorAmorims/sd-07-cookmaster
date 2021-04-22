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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};