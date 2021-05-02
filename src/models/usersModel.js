const { ObjectId } = require('mongodb');
const connect = require('./connection');

const colName = 'users';

const createUser = async (newUser, admin) => {
  const { email, name, password } = newUser;
  let role = 'user';
  if (admin) role = 'admin';
  const { insertedId } = await connect()
    .then((db) => db.collection(colName).insertOne({ email, name, password, role }));
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
    .then((db) => db.collection(colName).findOne({ email }));
  return search;
};

const searchByAccount = async (email, password) => {
  const search = await connect()
    .then((db) => db.collection(colName).findOne({ email, password }));
  return search;
};

module.exports = {
  createUser,
  searchByEmail,
  searchByAccount,
};
