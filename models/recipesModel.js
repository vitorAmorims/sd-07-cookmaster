const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const registerRecipe = async (userId, name, ingredients, preparation) => {
  const result = await connection().then((db) => 
    db.collection('recipes').insertOne({ userId, name, ingredients, preparation }));
  return result.ops[0];
};

const getAllRecipes = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};

module.exports = {
  registerRecipe,
  getAllRecipes,
};