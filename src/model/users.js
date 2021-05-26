const connection = require('./connection');

let response = null;

const register = async (user) => {
  await connection()
    .then((db) => db.collection('users').insertOne(user))
    .then((result) => {
      // eslint-disable-next-line prefer-destructuring
      response = result.ops[0];
    });
    return response;
};

const findByEmail = async (email) => {
  await connection()
    .then((db) => db.collection('users').find({ email }).toArray())
    .then((result) => {
      // eslint-disable-next-line prefer-destructuring
      response = result[0];
    });
    return response;
};

module.exports = {
  register,
  findByEmail,
};