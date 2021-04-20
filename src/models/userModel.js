const connection = require('../config/connection');

const addUser = (name, email, password) => connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then((item) => item.ops[0]);

const findUserByEmail = (email) => connection()
    .then((db) => db.connection('users').findOne({ email }));

module.exports = {
    addUser,
    findUserByEmail,
};
