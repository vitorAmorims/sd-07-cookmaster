const connection = require('../config/connections');

const createUsers = async (name, email, password, role = 'user') => {
 const createdUser = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
    return { user: createdUser.ops[0] };
};

const existsEmail = async (email) => {
  const emailExists = await connection().then((db) =>
     db.collection('users').findOne({ email }));
  return emailExists;
 };

module.exports = {
  createUsers,
  existsEmail,
};