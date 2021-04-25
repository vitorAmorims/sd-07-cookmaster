const { ObjectId } = require('mongodb');
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

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

module.exports = {
  getAllRecipes,
  registerRecipe,
  getRecipeById,
};
