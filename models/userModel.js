const connection = require('../config/conn');

const getAllUsers = async () =>
  connection().then((db) => db.collection('users').find().toArray());

const registerUser = async (name, email, password) =>
  connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then((result) => result.ops[0]);

const getUserEmail = async (email) => {
  const userEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return userEmail;
};

module.exports = {
  getAllUsers,
  getUserEmail,
  registerUser,
};
