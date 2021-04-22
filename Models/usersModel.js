const connection = require('../Config/connection');
// const { ObjectId } = require('mongodb');

const createUser = async (name, email, password, role) => {
  return connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role}))
    .then((result) => result.ops[0]);
};

const searchEmail = async (email) => {
  return connection()
  .then((db) => db.collection('users').findOne({ email }))
};

module.exports = {
  createUser,
  searchEmail
}
