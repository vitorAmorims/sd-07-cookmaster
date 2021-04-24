const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const getUsers = async () => connection().then((db) => db.collection('users'));

const addUser = async (name, email, password, role = "user") =>
  connection()
    .then((db) => db.collection('users').insertOne({name, email, password, role}));

const checkForUserEmail = async (email) => getUsers()
    .then((products) => products.findOne( {email} ));

module.exports = {
  addUser,
  checkForUserEmail,
};
