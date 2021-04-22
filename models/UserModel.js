// const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (user) =>
  connection().then(async (db) => {
    const newUser = await db.collection('users')
      .insertOne(user);
    return { user: newUser.ops[0] };
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
