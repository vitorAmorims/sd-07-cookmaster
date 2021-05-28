const connect = require('../config/connection');

const getAll = async () =>
  connect()
    .then((db) => db.collection('recipes').find().toArray());

const create = async (name, ingredients, preparation, userId) => {
    const { insertedId } = await connect().then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
    return { _id: insertedId, name, ingredients, preparation, userId };
  };

module.exports = {
  create,
  getAll, 
};