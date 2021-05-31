const connection = require('./connection');

const COLL_NAME = 'users';

const addUser = async (name, email, password) => connection()
  .then((db) => db.collection(COLL_NAME)
  .insertOne({ name, email, password, role: 'user' }));

const userByEmail = async (email) => connection()
    .then((db) => db.collection(COLL_NAME).findOne({ email }));

module.exports = {
  addUser,
  userByEmail,
};
