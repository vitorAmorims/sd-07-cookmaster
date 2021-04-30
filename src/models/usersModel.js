const connect = require('./connection');

const createUser = async (newUser) => {
  const { email, name, password } = newUser;
  const role = 'user';
  const user = await connect()
    .then((db) => db.collection('users').insertOne({ email, name, password, role }));
  return { ...user, _id: user.insertedId };
};

const searchByEmail = async (user) => {
  const userEmail = user.email;
  const search = await connect()
    .then((db) => db.collection('users').findOne({ email: userEmail }));
  return search;
};

module.exports = {
  createUser,
  searchByEmail,
};
