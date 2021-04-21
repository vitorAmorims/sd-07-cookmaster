const { ObjectId } = require('mongodb');
const connection = require('./database/connection');

const getByEmail = async (email) =>
  await connection()
    .then((db) => db.collection('users'))
    .then((users) => users.findOne({ email }));

// using return
const create = async (name, email, password) => {
  const userNew = await connection()
    // .then(console.log('modelsgetById'))
    .then((db) => db.collection('users').insertOne({ name, email, password }))
    .then((result) => ({ name, email, role: 'user', password, _id: result.insertedId }));
  return userNew.ops;
};

const getAll = async () =>
  await connection()
    .then((db) => db.collection('users'))
    .then((users) => users.find().toArray());

// const getById = async (id) =>
//   await connection()
//     .then((db) => db.collection('users'))
//     // .then(console.log('modelsgetById'))
//     .then((users) => users.findOne(ObjectId(id)));

module.exports = {
  getByEmail,
  create,
  getAll,
  // getById,
  // updateById,
  // excludeById
};