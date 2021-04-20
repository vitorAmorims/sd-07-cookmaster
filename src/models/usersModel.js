const conn = require('../config/conn');
const { ObjectId } = require('mongodb');

const createUser = async (name, email, password) => conn()
  .then(async (db) => {
    const user = await db.collection('users').insertOne({name, email, password});
    return user.ops[0];
  });

  module.exports = {
    createUser,
  };