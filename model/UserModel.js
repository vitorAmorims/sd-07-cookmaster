const { ObjectId } = require('mongodb');
const connect = require('../config/connect');

const registerUser = async (name, email, password) => {
  const role = 'user';
  const user = await connect().then((db) =>
       db.collection('users').insertOne({ name, password, email, role }));

  return { name, email, role, _id: user.insertedId };
};

const findUser = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

  const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    return connect().then((db) => db.collection('users').findOne({ _id: ObjectId(id) }));
  };

module.exports = {
    registerUser,
    findUser,
    findById,
};
