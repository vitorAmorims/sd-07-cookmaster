const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

async function create(name, ingredients, preparation, userId) {
  return connection()
    .then((db) => db.collection('recipes').insertOne(
        { name, ingredients, preparation, userId },
    ));
}

async function findAll() {
  return connection()
    .then((db) => db.collection('recipes').find().toArray());
}

async function findById(id) {
  return connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
}

async function update(id, name, ingredients, preparation) {
  return connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, 
      { $set: { name, ingredients, preparation } }));
}

async function createImage(id, image) {
  return connection()
    .then((db) => db.collection('recipes').updateOne({ _id: ObjectId(id) }, 
      { $set: { image } }));
}

async function exclude(id) {
  return connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
  createImage,
};
