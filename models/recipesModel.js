const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (userId, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({ userId, name, ingredients, preparation })
    .then((recipe) => recipe.ops[0]));

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const updateRecipe = async (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes')
  .findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  ));

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const updateRecipeImage = async (id, image) => connection()
  .then((db) => db.collection('recipes')
  .findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image } },
    { returnOriginal: false },
  ));

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateRecipeImage,
};
