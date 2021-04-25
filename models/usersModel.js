const conn = require('../config/connection');

const create = async (name, email, password) => {
  const user = await conn().then((db) => db
    .collection('users')
    .insertOne({ name, email, password }));

  return { user: {
    name,
    email,
    role: 'user',
    _id: user.insertedId, 
  } };
};

const getByEmail = async (email) => {
  const user = await conn().then((db) => db
    .collection('users')
    .findOne({ email }));

  return user;
};

module.exports = {
  create,
  getByEmail,
};
