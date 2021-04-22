const connect = require('../../config/conn');

const COLLECTION_NAME = 'users';

const add = async (name, email, password) =>
  connect().then(async (db) => {
    const user = await db.collection(COLLECTION_NAME)
    .insertOne({ name, email, password, role: 'user' });
    return user.ops[0];
  });

const getEmail = async (email) =>
  connect().then((db) =>
    db.collection(COLLECTION_NAME)
    .findOne({ email }));

module.exports = {
  add,
  getEmail,
};
