const connection = require('./connection');

let response = null;

const register = async (user) => {
  await connection()
    .then((db) => db.collection('users').insertOne(user))
    .then((result) => {
      const [ops] = result.ops;
      response = ops;
    });
    return response;
};

const findByEmail = async (email) => {
  await connection()
    .then((db) => db.collection('users').find({ email }).toArray())
    .then((result) => {
      const [output] = result;
      response = output;
    });
    return response;
};

module.exports = {
  register,
  findByEmail,
};