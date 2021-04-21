const connection = require('../config/connections');

const createUsers = async (user) => {
 const createdUser = await connection().then((db) =>
    db.collection('users').insertOne(user));
    createdUser.ops[0].role = 'user';
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