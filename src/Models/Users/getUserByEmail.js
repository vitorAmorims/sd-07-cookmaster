const connection = require('../connection');
require('dotenv').config();

// Collection remote test
const DB_COLLECTION = 'users';

const getUser = (result) => result;

const getUserByEmail = async (email) =>
  connection()
    .then((db) =>
      db.collection(DB_COLLECTION).findOne({
        email,
      }))
    .then((result) => getUser(result))
    .catch((error) => console.log(`Error in model addUser: ${error}`));

module.exports = { getUserByEmail };
