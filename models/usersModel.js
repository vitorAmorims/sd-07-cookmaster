const connection = require('./connection');

const registerUser = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' })
    .then((user) => user.ops[0]));

const getUserEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = { 
  registerUser,
  getUserEmail,
};
