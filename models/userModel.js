const connection = require('../config/connection');

const getAllUsersModel = async () => connection().then(
  (db) => db.collection('users').find().toArray(),
);

const getUserByEmail = async (userEmail) => connection().then(
  (db) => db.collection('users').findOne({ email: userEmail }),
);

const createUserModel = async (name, email, password, role) => connection().then(
  (db) => db.collection('users').insertOne({ name, email, password, role })
    .then((result) => ({ user: { _id: result.insertedId, name, email, password, role } })),
);

module.exports = {
  getAllUsersModel,
  createUserModel,
  getUserByEmail,
};