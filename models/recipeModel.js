const connect = require('../configuration/connection');

const create = async (recipe) => {
  const createdRecipe = await connect().then((db) =>
    db.collection('recipes').insertOne(recipe));
  return createdRecipe.ops[0];
};

module.exports = {
  create,
};