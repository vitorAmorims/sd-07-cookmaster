const connection = require('./conn');

const findUserByEmail = async (email) => {
  const db = await connection();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const addUserModel = async (name, email, password) => {
  const db = await connection();
  const product = await db.collection('users').insertOne({ name, email, password, role: 'user' });
  console.log(product);
  return product.ops[0];
};

const getAllUsersModel = async () => {
  const db = await connection();
  return db.collection('users').find().toArray();
};

module.exports = {
  addUserModel,
  findUserByEmail,
  getAllUsersModel,
};