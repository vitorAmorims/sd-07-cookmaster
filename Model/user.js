const connect = require('../config/Connect');

const create = async (name, email, password, role) => 
  connect()
  .then((db) => db.collection('users')
    .insertOne({ name, email, password, role }))
  .then((result) => result.ops[0])
  .catch((err) => console.error(err.message));

  const getByEmail = async (email) =>
  connect()
    .then((db) => db.collection('users')
      .findOne({ email }))
    .catch((error) => console.error(error.message));

const createAdmin = async (name, email, password, role) => 
  connect()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role }))
    .then((result) => result.ops[0])
    .catch((err) => console.log(err.message));

module.exports = {
  create,
  getByEmail,
  createAdmin,
};