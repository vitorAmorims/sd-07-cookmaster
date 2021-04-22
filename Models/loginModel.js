const connection = require('../Config/connection');

const loginUser = async (email) => connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((user) => user);

const searchEmailAndPass = async (email, password) => connection()
  .then((db) => db.collection('users').findOne({ email, password }))
  .then((user) => user);

module.exports = {
  loginUser,
  searchEmailAndPass,
};
