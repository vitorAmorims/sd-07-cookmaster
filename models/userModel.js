const conn = require('./connection');

const createUser = async (name, email, password, role) => {
  const { insertedId } = await conn()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

    return ({
      _id: insertedId,
      name,
      email,
      role,
    });
};

const getAllUsers = async () => {
  const users = await conn().then((db) => db.collection('users').find().toArray());
  return users;
};

const findByEmail = async (email) => {
  const user = await conn().then((db) => db.collection('users').findOne({ email }));
  return user;
};

const getIdAdmin = () => conn().then((db) => 
  db.collection('users').find({ role: 'admin' }).toArray());

module.exports = {
  createUser,
  getAllUsers,
  findByEmail,
  getIdAdmin,
};
