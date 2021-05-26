const connection = require('./connection');

const createUser = async (userData) => {
  const { role } = userData;
  const userInfo = { ...userData, role: role || 'user' };
  await connection()
    .then((db) => db.collection('users').insertOne(userInfo));
  return { user: userInfo };
};

const getAllUsers = async () => {
  await connection()
    .then((db) => db.collection('users').find().toArray());
};

const getUserByEmail = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
};