const { ObjectID } = require('mongodb');
const connection = require('../Config/connection');

const createRecipes = async (name, ingredients, preparation, id) => connection()
  .then((db) => db
  .collection('recipes')
  .insertOne({ name, ingredients, preparation, userId: ObjectID(id) }))
  .then((result) => result.ops[0]);

const getAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectID(id)))
  .catch((err) => err.message);

const updateRecipe = async (id, name, ingredients, preparation) => connection()
  .then((db) => db
  .collection('recipes')
  .findOneAndUpdate(
    { _id: ObjectID(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
    ));

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
