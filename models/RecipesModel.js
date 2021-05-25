const { ObjectId } = require('bson');
const connection = require('./connection');

const create = (userId, name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({
      userId,
      name,
      ingredients,
      preparation,
    }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }));

const getAll = () => 
    connection()
      .then((db) => db.collection('recipes').find().toArray())
      .then((recipes) => recipes);

const findById = (id) =>
    connection()
      .then((db) => db.collection('recipes').findOne(ObjectId(id)))
      .then((recipe) => recipe);

const updateById = (id, name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    ))
    .then(() => ({
      id,
      name,
      ingredients,
      preparation,
    }));

module.exports = {
  create,
  getAll,
  findById,
  updateById,
};