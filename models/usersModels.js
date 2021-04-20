const connection = require('../config/connections');

const createUsers = async (user) => {
  const newUser = await connection().then((db) =>
    db.collection('users').insertOne(user));
  return { user }; 
};

module.exports = {
  createUsers,
};