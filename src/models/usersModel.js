const conn = require('../config/conn');

const createUser = async (name, email, password) => conn()
  .then(async (db) => {
    const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
    return user.ops[0];
  });

const getByEmail = async (email) => conn()
  .then(async (db) => db.collection('users').findOne({ email }));

  module.exports = {
    createUser,
    getByEmail,
  };