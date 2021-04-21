const connection = require('../config/conn');

const create = async (name, email, password, role) => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
  return { user: { name, email, role, _id: user.insertedId } };
};

const getByEmail = async (email) => { 
  const user = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return user;
};

module.exports = {
  create,
  getByEmail,
};
