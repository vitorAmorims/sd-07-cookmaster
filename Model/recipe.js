const { ObjectId } = require('mongodb');
const connect = require('../config/Connect');

const create = async (name, ingredients, preparation, userId) =>
  connect()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0])
    .catch((err) => console.error(err));

const getAllRecipes = async () => 
  connect()
    .then((db) => db.collection('recipes')
      .find()
      .toArray());

const getById = async (id) => 
  connect()
    .then((db) => db.collection('recipes')
      .findOne(ObjectId(id)))
    .catch((err) => console.error(err));

const updateRecipe = async (name, ingredients, preparation, id) => 
  connect()
    .then((db) => db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id) }, 
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false },
      ));

module.exports = {
  create,
  getAllRecipes,
  getById,
  updateRecipe,
};