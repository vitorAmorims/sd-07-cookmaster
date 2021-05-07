const connection = require('./connection');

const findByName = async (name) => 
connection().then((db) => db.collection('users').findOne({ name }));

const create = async (name, email, password, role) => {
const user = await connection()
    .then((db) =>
        db.collection('users')
          .insertOne({ name, email, password, role }));
    return user;
  };

module.exports = {
  create,
  findByName,
};