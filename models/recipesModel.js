const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const getAll = async () =>
  connect()
    .then((db) => db.collection('recipes').find().toArray());

const create = async (name, ingredients, preparation, userId) => {
    const { insertedId } = await connect().then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
    return { _id: insertedId, name, ingredients, preparation, userId };
  };

  const getById = async (id) => { 
    if (ObjectId.isValid(id)) {
    const recipe = connect()
    .then((db) => db.collection('recipes')
    .findOne(ObjectId(id)));
    return recipe;
    }
    return null;
  };

module.exports = {
  create,
  getAll,
  getById,
};