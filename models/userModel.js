const connection = require('./connection');

const users = 'users';

const createUser = async (user) => connection()
  .then((db) => db.collection(users)
    .insertOne(user));

const findUserByEmail = async (email) => connection()
.then((db) => db.collection(users)
  .findOne({ email }));

module.exports = {
  createUser,
  findUserByEmail,
};
