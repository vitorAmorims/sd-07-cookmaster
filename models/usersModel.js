const connect = require('./connection');

const addNewUser = async (name, email, password) =>
  connect().then(async (db) => {
    const product = await db
      .collection('users')
      .insertOne({ name, email, password, role: 'user' });
    return product.ops[0];
  });

const findUserByEmail = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

const findUserById = async (id) =>
  connect().then((db) => db.collection('users').findOne({ _id: id }));

module.exports = {
  addNewUser,
  findUserByEmail,
  findUserById,
};
