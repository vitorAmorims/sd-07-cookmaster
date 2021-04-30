const connect = require('../util/connection');

const regRecipeModel = async (newRecipe, userId) => (
  connect().then((db) => db.collection('recipes')
    .insertOne({ ...newRecipe, userId }))
    .then((result) => result.ops[0])
);

module.exports = {
  regRecipeModel,
};