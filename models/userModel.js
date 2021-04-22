//  const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const getAll = async () => connect().then((db) => db.collection('users').find({}).toArray());

const addUser = async (name, email, password) => 
  connect().then(async (db) => {
    await db.collection('users').insertOne({ name, email, password });
    return {
      name,
      email,
      password,
    };
  });

module.exports = {
  getAll,
  addUser,
};