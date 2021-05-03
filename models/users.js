const connection = require('./connection');

const findByName = async (name) => 
connection().then((db) => db.collection('users').findOne({ name }));

const create = async (name, email, password) => {
const user = await connection()
    .then((db) =>
        db.collection('users')
          .insertOne({ name, email, password }));
    return user;
  };

module.exports = {
  create,
  findByName,
};