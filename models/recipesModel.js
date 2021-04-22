const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const recipe = await connection().then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return recipe.ops[0];
};

const getRecipes = async () => {
  const recipes = await connection().then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
  try {
    const recipe = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
    return recipe;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};