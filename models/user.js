const connection = require('./connection');

const addUser = async (name, email, password, role) => {
  const newUser = {
    name,
    email,
    password,
    role,
  };
  const emailRegistered = await connection().then((db) =>
    db.collection('users').find({ email }).count());
  if (emailRegistered >= 1) return null;
  const insert = await connection().then((db) => db.collection('users').insertOne(newUser));
  const result = insert.ops[0];
  delete result.password;
  return result;
};
module.exports = {
  addUser,
};
