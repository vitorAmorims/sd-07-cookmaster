const { ObjectId } = require('bson');
const getConnection = require('./connection');

const newUser = async ({ name, email, password, role = 'user' }) => {
  const db = await getConnection('users');
  const user = await db.insertOne({ name, email, password, role });

  return user.ops[0];
};

const getUserByEmail = async (email) => {
  const db = await getConnection('users');
  const user = await db.find({ email }).toArray();

  return user[0];
};

const getUserById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection('users');
  const user = await db.find(ObjectId(id)).toArray();

  return user[0];
};

module.exports = {
  newUser,
  getUserByEmail,
  getUserById,
};