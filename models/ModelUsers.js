const connect = require('../config/conn');

const collectionUsers = 'users';

const signUpUser = async (data) => {
  const { name, email, password, role } = data;
  const db = await connect();
  const { ops } = await db.collection(collectionUsers)
    .insertOne({ name, email, password, role });
  return ops;
};

const findUserByEmail = async (email) => {
  const db = await connect();
  return db.collection(collectionUsers).findOne({ email });
};

const findUserById = async (id) => {
  const db = await connect();
  return db.collection(collectionUsers).findOne({ id });
};

module.exports = { signUpUser, findUserByEmail, findUserById };
