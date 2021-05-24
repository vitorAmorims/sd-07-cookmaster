const connection = require('./connection');

const createUser = async (userData) => {
  const userInfo = {...userData, role: 'user'}
  const user = await connection()
    .then((db) => db.collection('users').insertOne(userInfo));
    return {user: userInfo}
}

const getAllUsers = async () => {
  return await connection()
    .then((db) => db.collection('users').find().toArray());
}

module.exports = {
  createUser,
  getAllUsers,
}