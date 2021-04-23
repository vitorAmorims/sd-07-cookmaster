const connect = require('./connection');

const registerUser = async (name, email, password) =>
  connect().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then((result) => result.ops[0].name);

const getUserByEmail = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

const getAllUsers = async () =>
  connect()
    .then((db) => db.collection('users').find().toArray());

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
};
