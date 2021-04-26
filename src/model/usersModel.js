// const { ObjectId } = require('mongodb');
const connection = require('../../config/connection');

const createUser = async (name, email, password) => {
  const role = 'user';
  const user = await connection()
  .then((db) =>
  db.collection('users')
  .insertOne({ name, email, password, role }));
  return { _id: user.insertedId, name, email, role };
};

const countByEmailDuplicate = async (email) => {
  const user = await connection()
    .then((db) =>
    db.collection('users')
      .countDocuments({ email }));
      return user;
};

const findUser = async (email) => {
  const user = await connection()
    .then((db) =>
      db.collection('users')
        .findOne({ email }));
  return user;
};

module.exports = {
  createUser,
  countByEmailDuplicate,
  findUser,
};