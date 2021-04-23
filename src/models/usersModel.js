// const { ObjectId } = require('mongodb');

const connection = require('../config/connection');

// prettier-ignore
const getUserByEmail = async (email) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne({ email }, { name: 0, password: 0 }));
  return user;
};

// prettier-ignore
const getAllUsers = async () => {
  const allUsers = await connection().then((db) =>
    db.collection('users').find().toArray());

  return allUsers;
};

// prettier-ignore
const createUser = async (name, email, password) => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return { _id: user.insertedId, name, email, role: 'user' };
};

const createAdmin = async (name, email, password) => {
  const admin = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'admin' }));

  return { _id: admin.insertedId, name, email, role: 'admin' };
};

module.exports = { createUser, getAllUsers, getUserByEmail, createAdmin };
