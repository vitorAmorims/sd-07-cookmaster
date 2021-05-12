const connection = require('./connection');

const col = 'users';

const createUser = async (userData) => connection()
  .then((db) => db.collection(col)
    .insertOne({ ...userData, role: 'user' }))
    .then((result) => (
      { 
        user: {
          _id: result.insertedId,
          name: userData.name,
          email: userData.email,
          role: 'user',
        },
      }
));

const createAdmin = async (adminData) => connection()
  .then((db) => db.collection(col)
    .insertOne({ ...adminData, role: 'admin' }))
    .then((result) => (
      {
        user: {
          _id: result.insertedId,
          name: adminData.name,
          email: adminData.email,
          role: 'admin',
        },
      }
));

const getUserByEmail = async (email) => connection()
  .then((db) => db.collection(col)
    .findOne({ email }));

const login = async (loginData) => connection()
    .then((db) => db.collection(col)
      .findOne(
        {
          email: loginData.email,
        },
      ));

module.exports = {
  createUser,
  createAdmin,
  getUserByEmail,
  login,
};
