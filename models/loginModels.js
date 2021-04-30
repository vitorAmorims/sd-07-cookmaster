const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const USERS = 'users';
const LOGIN = 'login';

const getAll = async () => {
  return connection().then(db => db.collection(LOGIN).find({}).toArray());
};

const getById = async (id) => {
  return connection().then(db =>
    db.collection(LOGIN).findOne(ObjectId(id))
  );
};

const create = async ({email, token}) => {
  const login = await connection().then(db =>
    db.collection(LOGIN).insertOne({ email, token })
  );
  return { "login": {_id: login.insertedId, email, token }};
};

const update = async ({id, email, password }) => {
  const login = await connection().then((db) => db
    .collection(LOGIN)
    .updateOne({ _id: ObjectId(id) }, { $set: { email, password } })
  );
  return { "login": login };
};

const exclude = async (id) => {
  return connection().then((db) => db
    .collection(LOGIN)
    .deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};
