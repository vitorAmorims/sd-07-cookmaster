// const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

const findUser = async (email) => {
  const user = await connection()
    .then((db) =>
      db.collection('users')
        .findOne({ email }));
  return user;
};

module.exports = {
  findUser,
};