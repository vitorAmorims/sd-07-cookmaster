const connect = require('../util/connection');

const findUserModel = async () => {
  connect().then((db) => db.collection('users')
    .find().toArray());
};

const findEmailModel = async (email) => (
  connect().then((db) => db.collection('users')
    .findOne({ email }))
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