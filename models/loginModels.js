const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const LOGIN = 'login';

const getAll = async () => connection().then((db) => db.collection(LOGIN).find({}).toArray());

const getById = async (id) => connection().then((db) =>
    db.collection(LOGIN).findOne(ObjectId(id)));

const create = async ({ email, token }) => {
  await connection().then((db) =>
    db.collection(LOGIN).insertOne({ email, token }));
  return { token };
};

const update = async ({ id, email, password }) => {
  const login = await connection().then((db) => db
    .collection(LOGIN)
    .updateOne({ _id: ObjectId(id) }, { $set: { email, password } }));
  return { login };
};

const exclude = async (id) => connection().then((db) => db
    .collection(LOGIN)
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
