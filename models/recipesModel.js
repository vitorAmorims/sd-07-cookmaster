// const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const insertRecipe = async (data) => 
  connection()
    .then((db) => db.collection('recipes').insertOne(data));

// const findUserByEmail = async (email) => connection()
//   .then((db) => db.collection('users').findOne({ email }));

const findAll = async () => 
  connection().then((db) => db.collection('recipes').find().toArray());

module.exports = {
  insertRecipe,
  // findUserByEmail,
  findAll,
};
