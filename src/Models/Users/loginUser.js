const connection = require('../connection');
require('dotenv').config();

const getUser = (user) => user;

const loginUser = async (email, password) =>
  connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION).find({
        email,
        password,
      }))
      
    .then((result) => getUser(result).toArray())
    .catch((error) => console.log(`Error in model login user: ${error}`));

module.exports = { loginUser };
