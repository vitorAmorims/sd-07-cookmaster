const connection = require('../../configs');

const createUser = async (user) => {
  const createduser = await connection()
    .then((db) => db.collection('users')
      .insertOne(user));
  return createduser.ops[0];
};

const findUserByEmail = async (email) => {
  const foundedUser = await connection()
    .then((db) => db.collection('users')
      .findOne({ email }));
  return foundedUser;
};

module.exports = {
  createUser,
  findUserByEmail,
};
