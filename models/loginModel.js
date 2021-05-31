const connection = require('./connection');

const COLL_NAME = 'users';

const login = async (email, password) => connection()
  .then((db) => db.collection(COLL_NAME));

module.exports = {
  login,
};
