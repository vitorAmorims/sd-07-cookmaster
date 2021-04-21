const connection = require('../../config/connection');

const createUser = async (name, email, password) => {
  const role = 'user';
  const { insertedId } = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
    return {
      name,
      email,
      role,
      insertedId,
    };
};

const getByEmail = async (email) => {
  const userByEmail = await connection().then((db) =>
    db.collection('users').findOne({ email }));
    return userByEmail;
};

module.exports = {
  createUser,
  getByEmail,
};
