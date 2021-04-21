const connection = require('./connection');

const getAll = async () =>
connection()
      .then((db) => db.collection('users').find().toArray());

const create = async (name, email, password, role) =>
connection()
          .then((db) => db.collection('users').insertOne({ name, email, password, role }))
          .then(((result) => ({ id: result.insertedId, name, email, password, role })));

const getByEmail = async (email) => 
  connection()
      .then((db) => db.collection('users').findOne({ email }));         

module.exports = { getAll, create, getByEmail };