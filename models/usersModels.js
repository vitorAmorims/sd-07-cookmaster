const connect = require('../config/conn');

const add = async (name, email, password, role) => 
  connect().then(async (db) => {
    const newUser = await db.collection('users').insertOne({ name, email, password, role });
    return newUser.ops[0];
  });

const getUser = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  add,
  getUser,
};
