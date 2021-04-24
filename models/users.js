const connection = require('./connection');

const getDbCollection = async () => connection()
    .then((db) => db.collection('users'));

const registerUser = async (name, email, password, role = 'user') => getDbCollection()
  .then((collection) => collection.insertOne({ name, email, password, role }));

const getEmail = async (email) => getDbCollection()
  .then((collection) => collection.findOne({ email }));

module.exports = {
  registerUser,
  getEmail,
};