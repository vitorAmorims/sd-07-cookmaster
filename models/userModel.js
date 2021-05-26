const { ObjectId } = require('mongodb');

const connection = require('../Db/connection');

const findByEmail = async (email) => {
  const db = await connection();
  return db.collection('users').findOne({ email });
};

const findById = async (id) => {
  const db = await connection();
  return db.collection('users').findOne(ObjectId(id));
};

const addUser = async (email, password, name, role = 'user') => {
  const db = await connection();
  const added = await db.collection('users')
  .insertOne({ email, password, name, role });
  return added.ops[0];
};

const updateUser = async (id, email, password, name) => {
  const db = await connection();
  return db.collection('users')
  .updateOne(
    { _id: ObjectId(id) },
    {

      $set: { email, password, name, role: 'user' },
    },
    );
};

module.exports = {
  updateUser,
  findByEmail,
  findById,
  addUser,
};