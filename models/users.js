const connection = require('./conn');

const findUserByEmail = async (email) => {
  try {
    const db = await connection();
    const result = await db.collection('users').findOne({ email });
    return result;  
  } catch (error) {
    console.error('model find user:', error.message);
  }
};

const addUserModel = async (name, email, password) => {
  const user = { name, email, password, role: 'user' };
  const db = await connection();
  const product = await db.collection('users').insertOne(user);
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