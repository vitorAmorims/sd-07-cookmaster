// const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const insertUser = async (data) => 
  connection()
    .then((db) => db.collection('users').insertOne(data));

const findUserByEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const findAll = async () => 
  connection().then((db) => db.collection('users').find().toArray());

module.exports = {
  insertUser,
  findUserByEmail,
  findAll,
};
