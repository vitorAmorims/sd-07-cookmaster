// const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (user) =>
  connection().then(async (db) => {
    const newUser = await db.collection('users')
      .insertOne(user);
    const { name, email, role } = newUser.ops[0];
    return { user: { name, email, role } };
  });
  
const getByEmail = async (email) => {
  const user = await connection().then((db) =>
    db.collection('users')
      .findOne({ email }));
  return user;
};

  module.exports = {
  create,
  getByEmail,
};
