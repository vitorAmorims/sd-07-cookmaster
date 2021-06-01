const connection = require('./connection');

const COLL_NAME = 'users';

const addUser = async (name, email, password) => connection()
  .then((db) => db.collection(COLL_NAME)
  .insertOne({ name, email, password, role: 'user' }));

const addAdmin = async (name, email, password) => connection()
  .then((db) => db.collection(COLL_NAME)
  .insertOne({ name, email, password, role: 'admin' }));

const userByEmail = async (email) => connection()
    .then((db) => db.collection(COLL_NAME).findOne({ email }));

module.exports = {
  addUser,
  userByEmail,
  addAdmin,
};
