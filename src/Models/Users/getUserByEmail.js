const connection = require('../connection');
require('dotenv').config();

const getUser = (result) => result;

const getUserByEmail = async (email) =>
  connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION).findOne({
        email,
      }))
    .then((result) => getUser(result.email))
    .catch((error) => console.log(`Error in model addUser: ${error}`));

module.exports = { getUserByEmail };
