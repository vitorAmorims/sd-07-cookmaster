//  const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const getAll = async () => connect().then((db) => db.collection('users').find({}).toArray());

const addUser = async (name, email, password) => 
  connect().then(async (db) => {
    const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });
    return user.ops[0];
  });

const replyEmail = async (email) => 
  connect().then(async (db) => {
    const verifyEmail = await db.collection('users').findOne({ email });
    return verifyEmail;
  });

module.exports = {
  getAll,
  addUser,
  replyEmail,
};