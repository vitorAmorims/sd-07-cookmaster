const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createUser = async (newUser) => {
  const { email, name, password } = newUser;
  const role = 'user';
  const { insertedId } = await connect()
    .then((db) => db.collection('users').insertOne({ email, name, password, role }));
  return {
    user: {
      name,
      _id: ObjectId(insertedId),
      email,
      password,
      role,
    },
  };
};

const searchByEmail = async (email) => {
  const search = await connect()
    .then((db) => db.collection('users').findOne({ email }));
  return search;
};

const searchByAccount = async (email, password) => {
  const search = await connect()
    .then((db) => db.collection('users').findOne({ email, password }));
  return search;
};

module.exports = {
  createUser,
  searchByEmail,
  searchByAccount,
};
