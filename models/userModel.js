const connect = require('../config/conn');

const registerUser = async (name, email, password, role) =>
  connect().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => result.ops[0]);

const findUser = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

module.exports = {
    registerUser,
    findUser,
};