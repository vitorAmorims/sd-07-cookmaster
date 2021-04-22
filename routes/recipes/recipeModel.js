const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

const createRecipe = async (name, ingredients, preparation, userId) => connection().then((db) =>
  db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getAll = async () => connection().then((db) =>
  db.collection('recipes').find({}).toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
  db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const updateRecipe = async (name, ingredients, preparation, id) => {
  await connection().then((db) =>
  db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
    ));
};

const removeRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
  db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  removeRecipe,
};
