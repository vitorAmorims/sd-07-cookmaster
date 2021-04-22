const connect = require('../config/connection');

const getAllUsers = async () => {
  const db = await connect();
  return db.collection('users').find().toArray();
};

const postNewUser = async (name, email, password) => {
  const db = await connect();
  return db.collection('users').insertOne({ name, email, password, role: 'user' });
};

const getUserByEmail = async (email) => {
  const db = await connect();
  return db.collection('users').findOne({ email });
};

module.exports = { getAllUsers, postNewUser, getUserByEmail };
