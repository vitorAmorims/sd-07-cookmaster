const connect = require('../config/conn');

const addRecipe = async (userId, name, ingredients, preparation) =>
  connect().then(async (db) => {
    const newRecipe = await db.collection('recipes')
      .insertOne({ userId, name, ingredients, preparation });
    return newRecipe.ops[0];
  });

const getRecipes = async () => 
  connect().then(async (db) => db.collection('recipes').find().toArray());

module.exports = {
  addRecipe,
  getRecipes,
};