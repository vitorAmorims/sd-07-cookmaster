const { connection } = require('../database');

const { USER } = require('../CODE_ERROR');

const create = async (name, email, password, role) =>
    connection()
    .then((db) => db.collection(USER)
    .insertOne({ name, email, password, role }))
    .then((user) => ({ name, email, role, _id: user.insertedId }));

const createAdmin = async (name, email, password, role) =>
    connection()
    .then((db) => db.collection(USER)
    .insertOne({ name, email, password, role }))
    .then((admin) => ({ name, email, role, _id: admin.insertedId }));

const getEmail = async (email) => 
    connection()
    .then((db) => db.collection(USER)
    .findOne({ email }));

module.exports = { create, getEmail, createAdmin };
