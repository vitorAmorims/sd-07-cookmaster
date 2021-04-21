const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const insertRecipe = async (data) => 
  connection()
    .then((db) => db.collection('recipes').insertOne(data));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const findAll = async () => 
  connection().then((db) => db.collection('recipes').find().toArray());

  const updateOne = async (id, data) => 
  connection().then(async (db) => {
    await db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: data });
    return { _id: id, ...data };
  });

module.exports = {
  insertRecipe,
  findById,
  findAll,
  updateOne,
};
