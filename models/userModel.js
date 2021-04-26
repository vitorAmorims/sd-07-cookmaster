const connect = require('../config/connection');

const register = async (name, email, password) =>
  connect().then(async (db) => { 
    const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });

    return { _id: user.insertedId, name, email, password, role: 'user' };
  });

  const findUser = async (username) =>
  connect().then((db) => db.collection('users').findOne({ username }));

  module.exports = {
    register, findUser,
  };