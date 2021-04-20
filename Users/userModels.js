const conn = require('../connection');

const findEmail = async (email) => {
  const checkEmailExists = await conn().then((db) => db.collection('users').findOne({ email }));

  return checkEmailExists;
};

const createUser = async (name, email, password) => {
  const addUser = await conn().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return { _id: addUser.insertedId, name, email, role: 'user' };
};

module.exports = {
  findEmail,
  createUser,
};