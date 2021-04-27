//  const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const getAll = async () => connect().then((db) => db.collection('users').find({}).toArray());

const addUser = async (name, email, password) => 
  connect().then(async (db) => {
    const userResp = await db.collection('users').insertOne(
      { name, email, password, role: 'user' },
    );
    const user = userResp.ops[0];
    return { code: 201, user };
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