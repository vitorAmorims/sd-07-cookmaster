// const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const getUsers = async () => connection().then((db) => db.collection('users'));

const addUser = async (name, email, password, role = 'user') =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

const findUser = async (email) => getUsers()
  .then((users) => users.findOne({ email }));

module.exports = {
  addUser,
  findUser,
};
