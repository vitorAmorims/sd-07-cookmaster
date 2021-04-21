const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const addRecipe = async (userId, name, ingredients, preparation) =>
  connect().then(async (db) => {
    const newRecipe = await db.collection('recipes')
      .insertOne({ userId, name, ingredients, preparation });
    return newRecipe.ops[0];
  });

const getRecipes = async () => 
  connect().then(async (db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

module.exports = {
  addRecipe,
  getRecipes,
  getRecipeById,
};