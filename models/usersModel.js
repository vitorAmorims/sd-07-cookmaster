const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const findEmail = async (email) => {
  const result = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return result;
};

const userRegistration = async (name, email, password, role) => {
  const result = await connection().then((db) => 
    db.collection('users').insertOne({ name, email, password, role }));
  return result.ops[0];
};

module.exports = {
  findEmail,
  userRegistration,
};