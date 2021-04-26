const connect = require('../config/connection');

const findUser = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

  module.exports = {
     findUser,
  };