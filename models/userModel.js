const connection = require('../config/conn');

const registerUser = async (name, email, password) =>
  connection().then((db) =>
    db.collection('users').insertOne({ email, password, name, role: 'user' }))
    .then((result) => result.ops[0]);

const getUserEmail = async (email) => {
  const userEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return userEmail;
};

// const getAll = async () =>
//   connection().then((db) => db.collection('users').find().toArray());
module.exports = {
  registerUser,
  getUserEmail,
};
