const { ObjectId } = require('mongodb');
const connection = require('./connection');
const collection = require('./collections');

const create = (newUser) => connection()
    .then((db) => db.collection(collection.USERS).insertOne({ ...newUser, role: 'user' }))
    .then((result) => ({ user: { _id: result.insertedId, ...newUser, role: 'user' } }));

const findByEmail = (email) => connection()
    .then((db) => db.collection(collection.USERS).findOne({ email }));

const findById = (id) => connection()
    .then((db) => db.collection(collection.USERS).findOne({ _id: ObjectId(id) }))
    .catch((error) => console.log(`user.findById: ${error.message}`));

module.exports = { create, findByEmail, findById };
