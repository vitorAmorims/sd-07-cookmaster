const connection = require('../../config/conn');

const create = async (name, email, password) => {
  const user = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return user.ops[0];
};

const findUser = async (email) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return user;
};

module.exports = {
  create,
  findUser,
};