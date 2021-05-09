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

module.exports = { signUpUser, findUserByEmail };
