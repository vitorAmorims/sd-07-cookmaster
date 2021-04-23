const connection = require('../config/conn');
const { ObjectID } = require('mongodb');

const NAME_COLLECTION = 'users';

const create = async (name, email, password, role) => {
  const newUser = await connection().then(db =>
    db.collection(NAME_COLLECTION).insertOne({ name, email, password, role }),
  );
  return newUser;
};

const readAll = async () => {
  const users = await connection().then(db =>
    db.collection(NAME_COLLECTION).find().toArray(),
  );
  return users;
};

const readById = async id => {
  const user = await connection().then(db =>
    db.collection(NAME_COLLECTION).findOne({ _id: ObjectID(id) }),
  );
  return user;
};

const readByEmail = async email => {
  const user = await connection().then(db =>
    db.collection(NAME_COLLECTION).findOne({ email: email }),
  );
  return user;
};

const readByPassword = async password => {
  const user = await connection().then(db =>
    db.collection(NAME_COLLECTION).findOne({ password: password }),
  );
  return user;
};

module.exports = {
  create,
  readAll,
  readById,
  readByEmail,
  readByPassword,
};
