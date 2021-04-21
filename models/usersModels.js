const connection = require('./connection');

const USERS_COLLECTION = 'users';

const createUser = ({ name, email, password, role }) => connection()
  .then((db) => db.collection(USERS_COLLECTION)
  .insertOne(
    {
      name,
      email,
      password,
      role,
    },
  ))
  .then((result) => ({
    user: {
      name,
      email,
      role,
      _id: result.insertedId,
    },
  }));

const findByEmail = (email) => connection()
  .then((db) => db.collection(USERS_COLLECTION).findOne({ email }))
  .catch((err) => err);

module.exports = {
  createUser,
  findByEmail,
};
