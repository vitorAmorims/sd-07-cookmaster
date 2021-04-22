const connection = require('../connection');
require('dotenv').config();

const getNewUser = ({ id, name, email, role }) => ({
  user: {
    name,
    email,
    role,
    _id: id,
  },
});

const createUser = async (name, email, password, role) =>
  connection()
    .then((db) =>
      db.collection(process.env.DB_COLLECTION).insertOne({
        name,
        email,
        password,
        role,
      }))
      
    .then((result) => getNewUser({ id: result.insertedId, name, email, role }))
    .catch((error) => console.log(`Error in model addUser: ${error}`));

module.exports = { createUser };
