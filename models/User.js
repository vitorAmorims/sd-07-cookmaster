const { connection } = require('../config/connection');

const login = (email, password) =>
  connection().then((db) =>
    db.collection('users').findOne({ email, password }));

const createUser = (name, email, password, role) =>
  connection()
    .then((db) =>
      db.collection('users').insertOne({
        name,
        email,
        password,
        role,
      }))
    .then((result) => result.ops[0]);

const findUserByEmail = (email) =>
  connection().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  login,
  createUser,
  findUserByEmail,
};
