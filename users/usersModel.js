const connect = require('../util/connection');

const findUserModel = async () => (
  connect().then((db) => db.collection('users')
    .find().toArray())
);

const findEmailModel = async (userEmail) => (
  connect().then((db) => db.collection('users')
    .findOne({ email: userEmail }))
);

const registerUserModel = async (user, role) => (
  connect().then((db) => db.collection('users')
    .insertOne({ ...user, role }))
    .then((result) => result.ops[0])
);

module.exports = {
  registerUserModel,
  findUserModel,
  findEmailModel,
};