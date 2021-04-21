const connection = require('../config/conn');

const create = async (name, email, password, role) => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
  return { user: { name, email, password, role, _id: user.insertedId } };
};

const findUser = async (email, token) => {
    await connection().then((db) =>
    db.collection('users').findOne({ email }));
    return { token };
};

module.exports = {
  create,
  findUser,
};