const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

async function create(name, email, password, role) {
  return connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));
}

async function findByEmail(email) {
  return connection()
    .then((db) => db.collection('users').findOne({ email }));
}

async function findById(id) {
  return connection()
    .then((db) => db.collection('users').findOne(ObjectId(id)));
}

module.exports = {
  create,
  findByEmail,
  findById,
};
