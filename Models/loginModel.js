const connection = require('../Config/connection');

const loginUser = async (email, password) => {
  return connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((user) => user)
};

const searchEmailAndPass = async (email, password) => {
  return connection()
  .then((db) => db.collection('users').findOne({ email, password }))
  .then((user) => console.log(user))
};

module.exports = {
  loginUser,
  searchEmailAndPass
}
