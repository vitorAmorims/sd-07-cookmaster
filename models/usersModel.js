const connect = require('./conn');

const createUser = async (name, email, password) => 
  connect().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then((result) => result.ops[0]);

const findEmail = async (email) =>
connect().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  createUser,
  findEmail,
};
