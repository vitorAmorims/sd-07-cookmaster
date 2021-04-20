// const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const insertUser = async (data) => 
  connection()
    .then((db) => db.collection('users').insertOne(data));

const findAll = async () => 
  connection().then((db) => db.collection('users').find().toArray());

module.exports = {
  insertUser,
  findAll,
};
