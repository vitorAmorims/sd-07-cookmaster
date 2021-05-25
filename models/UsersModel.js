const connection = require('./connection');

const create = async (name, email, password) =>
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

const findByEmail = async (email) =>
  connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  create,
  findByEmail,
};
