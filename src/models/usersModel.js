const connection = require('../config/connection');

// prettier-ignore
const getAllUsers = async () => {
  const allUsers = await connection().then((db) =>
    db.collection('users').find().toArray());

  return allUsers;
};

// prettier-ignore
const createUser = async (name, email, password) => {
  const product = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return { _id: product.insertedId, name, email, role: 'user' };
};

module.exports = { createUser, getAllUsers };
