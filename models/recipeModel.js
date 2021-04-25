const connect = require('../configuration/connection');

const create = async (recipe) => {
  const createdRecipe = await connect().then((db) =>
    db.collection('recipes').insertOne(recipe));
  return createdRecipe.ops[0];
};
const getAll = async () => {
  const recipes = await connect().then((db) =>
    db.collection('recipes').find().toArray());
  console.log('recipes no model', recipes);
  return recipes;
};

module.exports = {
  create,
  getAll,
};