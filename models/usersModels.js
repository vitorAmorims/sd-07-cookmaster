// const { ObjectId } = require('mongodb');
const connection = require('./conn');

const getUserEmail = async (email) => {
  const result = await connection().then((db) => db.collection('users').findOne({ email }));
  return result;
};

/* const getByIdUser = async (id) => 
  connection().then((db) => db.collection('users').findOne(ObjectId(id))); */

const addUser = async (name, email, password) => {
  const result = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return result.ops[0];
};

module.exports = {
  getUserEmail,
  addUser,
};
