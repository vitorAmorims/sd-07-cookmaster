const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLL_NAME = 'recipes';

const addRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection(COLL_NAME)
  .insertOne({ name, ingredients, preparation, userId }));

const getAll = async () => connection()
  .then((db) => db.collection(COLL_NAME).find().toArray());

const getById = async (id) => connection()
  .then((db) => db.collection(COLL_NAME).findOne(ObjectId(id)));

const updateById = async (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection(COLL_NAME)
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

const removeById = async (id) => connection()
  .then((db) => db.collection(COLL_NAME).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  addRecipe,
  getAll,
  getById,
  updateById,
  removeById,
};
