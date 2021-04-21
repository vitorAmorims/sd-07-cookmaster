const conn = require('../connection');

const findEmail = async (email) => {
  const checkEmailExists = await conn().then((db) => db.collection('users').findOne({ email }));

  return checkEmailExists;
}; // req. 1

const createUser = async (name, email, cryptpassword) => {
  const addUser = await conn().then((db) =>
    db.collection('users').insertOne({ name, email, password: cryptpassword, role: 'user' }));

  return { _id: addUser.insertedId, name, email, role: 'user' };
}; // req. 1

module.exports = {
  findEmail,
  createUser,
};