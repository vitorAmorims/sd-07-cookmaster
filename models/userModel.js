const { connection } = require('../database');

const { USER_COLLETION } = require('../CODE_ERROR');

const create = async (name, email, password, role) =>
    connection()
    .then((db) => db.collection(USER_COLLETION)
    .insertOne({ name, email, password, role }))
    .then((user) => ({ name, email, role, _id: user.insertedId }));

const getEmail = async (email) => 
    connection()
    .then((db) => db.collection(USER_COLLETION)
    .findOne({ email }));

module.exports = { create, getEmail };
