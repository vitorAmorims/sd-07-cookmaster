const connect = require('../util/connection');

const regRecipeModel = async (newRecipe, userId) => (
  connect().then((db) => db.collection('recipes')
    .insertOne({ ...newRecipe, userId }))
    .then((result) => result.ops[0])
);

const queryRecipesModel = async () => (
  connect().then((db) => db.collection('recipes')
    .find().toArray())
);

module.exports = {
  regRecipeModel,
  queryRecipesModel,
};