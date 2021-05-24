const connection = require('./connection');

const createUser = async (userData) => {
  const userInfo = {...userData, role: 'user'}
  const user = await connection()
    .then((db) => db.collection('users').insetOne(userInfo));
    return { _id: user.insertedId, userInfo}
}

const getAllUsers = async () => {
  return await connection
    .then((db) => db.collection('users').find().toArray());
}

module.exports = {
  createUser,
  getAllUsers,
}