const connection = require('./conn');

const findUserByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const addUser = async (name, email, password) => {
  const db = await connection();
  const product = await db.collection('users').insertOne({ name, email, password });
  return product.ops[0];
};

const getAllUsers = async () => {
  const db = await connection();
  return db.collection('users').find().toArray();
};

module.exports = {
  addUser,
  findUserByEmail,
  getAllUsers,
};