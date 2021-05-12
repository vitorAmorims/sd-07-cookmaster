const connection = require('./connection');

// short
const getAllUsers = async () => connection()
  .then((db) => db.collection('users').find().toArray());

// using return
const createUser = async (data) => {
  const userNew = await connection()
  .then((db) => db.collection('users').insertOne(data));
  // .then((result) => (data));
  // console.log(userNew);
  return userNew;
};

// better visible
const findOneUser = async (email) =>
  connection()
    .then((db) => db.collection('users'))
    .then((users) => users.findOne({ email }));
    // .then(console.log('findOne'));

module.exports = {
  createUser,
  getAllUsers,
  findOneUser,
};
