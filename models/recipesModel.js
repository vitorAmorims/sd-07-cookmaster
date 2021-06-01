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

module.exports = {
  addRecipe,
  getAll,
  getById,
};
