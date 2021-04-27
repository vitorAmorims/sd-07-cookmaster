const conn = require('../config/conn');

const collection = 'users';

const getAllUsers = () => conn()
  .then((db) =>
    db.collection(collection)
      .find()
      .toArray());

const addUser = async (name, email, role) => {
  const users = await conn().then((db) =>
    db.collection(collection).insertOne({ name, email, role }));

  return { user: { name, email, role, _id: users.insertedId } };
};

const findUser = async (email) => conn().then((db) =>
  db.collection(collection).findOne({ email }));

module.exports = {
  getAllUsers,
  addUser,
  findUser,
};