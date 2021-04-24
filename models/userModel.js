// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// consertar o "magic number user nessa função"
const addUserDB = async (name, email, password) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));
  const data = {
    user: {
      name,
      email,
      role: 'user',
      _id: insertedId,
    },
  };
  // console.log(`addUserDB no model valor : ${data}`);
  return data;
};

const findEmail = async (email) => {
  const findedEmail = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return findedEmail;
};

const findPassword = async (password) => {
  const findedPassword = await connection().then((db) =>
    db.collection('users').findOne({ password }));
  return findedPassword;
};

module.exports = {
  addUserDB,
  findEmail,
  findPassword,
};
