const connection = require('./connection');

const USERS = 'users';

const create = (newUser) => connection()
    .then((db) => db.collection(USERS).insertOne({ ...newUser, role: 'user' }))
    .then((result) => ({ user: { _id: result.insertedId, ...newUser, role: 'user' } }));

const findByEmail = (email) => connection()
    .then((db) => db.collection(USERS).findOne({ email }));

module.exports = { create, findByEmail };
