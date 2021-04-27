// const { ObjectId } = require('mongodb');
const connect = require('../../config/connection');
const { userToken } = require('../helpers/authentication');

const add = async (name, email, password) =>
  connect().then(async (db) => {
    const user = await db
      .collection('users')
      .insertOne({ name, email, password, role: 'user' });

    return user.ops[0];
  });

const findByEmail = async (email) => 
  connect().then(async (db) => {
    const userEmail = await db
      .collection('users')
      .findOne({ email });

    return userEmail;
  });

const findByPassword = async (password) => 
connect().then(async (db) => {
  const userPassword = await db
    .collection('users')
    .findOne({ password });

  return userPassword;
});

module.exports = {
  add,
  findByEmail,
  findByPassword,
};
