// const { ObjectId } = require('mongodb');
const connect = require('../../config/connection');

const COLLECTION_USERS_NAME = 'users';

const create = async (name, email, password, role) =>
  connect().then(async (db) => {
    const user = await db.collection(COLLECTION_USERS_NAME)
      .insertOne({ name, email, password, role });
    return user.ops[0];
  });

const findByEmail = async (email) =>
  connect().then(async (db) => {
    const user = await db.collection(COLLECTION_USERS_NAME).findOne({ email });
    return user;
  });

  module.exports = {
    create,
    findByEmail,
    /* findById,
    findAll,
    update,
    del, */
  };