const { ObjectId } = require('mongodb');
const connection = require('./database/connection');

const create = async (name, ingredients, preparation, userId) =>
  await connection()
    .then((db) => db.collection('recipes').insertOne(
      { name, ingredients, preparation, userId }
    ))
    .then((result) => (
      { name, ingredients, preparation, userId, _id: result.insertedId }
    ));

const getAll = async () =>
  await connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.findOne(ObjectId(id)));
};

const updateById = async (id, name, ingredients, preparation, userId) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation, userId } },
    ))
    .then((_result) => ({ _id: ObjectId(id), name, ingredients, preparation, userId }));
};

const excludeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db.collection('recipes'))
    .then((recipes) => recipes.deleteOne({ _id: ObjectId(id) }));
};

// const updateImg = async (id) => {};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  excludeById,
  // updateImg
};
