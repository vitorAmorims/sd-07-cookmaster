const connect = require('./connection');

const registerUser = async (name, email, password, role = 'user') => {
  const { insertedId } = await connect().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

const findEmail = async (email) =>
  connect().then((db) => db.collection('users').findOne({ email }));

module.exports = {
  registerUser,
  findEmail,
};
