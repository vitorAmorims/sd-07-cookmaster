const connect = require('./connection');

const getAllRecipes = async () =>
  connect()
    .then((db) => db.collection('recipes').find().toArray());

const registerRecipe = async (name, ingredients, preparation, userId) =>
  connect().then((db) =>
    db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId,
    })).then((result) => result.ops[0]);

module.exports = {
  getAllRecipes,
  registerRecipe,
};
