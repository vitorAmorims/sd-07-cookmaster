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

const editRecipeById = async (id, name, ingredients, preparation) => {
  connect().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } }));
    return { name, ingredients, preparation };
};

module.exports = {
  getAllRecipes,
  registerRecipe,
  getRecipeById,
  editRecipeById,
};
