const connection = require('../connection');
require('dotenv').config();

const getNewuser = ({ id, name, email }) => ({
  user: {
    name,
    email,
    role: 'user',
    _id: id,
  },
});

const createUser = async (name, email, password) =>
  connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION).insertOne({
        name,
        email,
        password,
        role: 'user',
      }))
    .then((result) => getNewuser({ id: result.insertedId, name, email }))
    .catch((error) => console.log(`Error in model addUser: ${error}`));

module.exports = { createUser };
