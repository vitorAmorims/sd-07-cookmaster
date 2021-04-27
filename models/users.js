const connect = require('../config/connect');

const createUserModel = async (user, role = 'user') => 
   connect().then((db) => db.collection('users').insertOne({ ...user, role }))
    .then((response) => response.ops[0])
    .catch((error) => console.error(error.message));

const findUserByEmail = async (email) => 
  connect().then((db) => db.collection('users').findOne({ email }))
    .catch((error) => error.message);

module.exports = {
  createUserModel,
  findUserByEmail,
};