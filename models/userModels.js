const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const USERS = 'users';

const getAll = async () => connection().then((db) => db.collection(USERS).find({}).toArray());

const getById = async (id) => connection().then((db) =>
    db.collection(USERS).findOne(ObjectId(id)));

const create = async ({ name, email, password, role }) => {
  const user = await connection().then((db) =>
    db.collection(USERS).insertOne({ name, email, password, role }));
  return { user: { _id: user.insertedId, name, email, password, role } };
};

const update = async ({ id, name, email, password, role }) => {
  const user = await connection().then((db) => db
    .collection(USERS)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, email, password, role } }));
  return { user };
};

const exclude = async (id) => connection().then((db) => db
    .collection(USERS)
    .deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
