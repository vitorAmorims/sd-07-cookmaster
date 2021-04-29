const connection = require('../connection');
// require('dotenv').config();

// Collection remote test
const DB_COLLECTION = 'users';

const getUser = (user) => user;

const loginUser = async (email, password) =>
  connection()
    .then((db) =>
      db.collection(DB_COLLECTION).find({
        email,
        password,
      }))
      
    .then((result) => getUser(result).toArray())
    .catch((error) => console.log(`Error in model login user: ${error}`));

module.exports = { loginUser };
