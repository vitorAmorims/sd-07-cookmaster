const connection = require('./connection');

const create = (name, email, password) =>
  connection()
    .then((db) => db.collection('users').insertOne({
      name,
      email,
      password,
      role: 'user',
    }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      email,
      password,
      role: 'user',
    }));

const findByEmail = (email) =>
  connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  create,
  findByEmail,
};
