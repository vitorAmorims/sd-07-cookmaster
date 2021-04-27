// No banco um usuário precisa ter os campos Email, Senha, Nome e Role.

// Usuários criados através desse endpoint devem ter seu campo Role com
// o atributo user, ou seja, devem ser usuários comuns, e não admins.

// const { add, getUserEmail } = require('../models/UsersModel');

const connect = require('../config/conn');
// const { ObjectId } = require('mongodb');

const getUserEmail = async (email) => connect()
.then((db) => db.collection('users').findOne({ email }));

const add = async (name, email, password) => connect().then(async (db) => {
  const user = await db.collection('users').insertOne({
    name, email, password, role: 'user',
  });
  return user.ops[0];
});

module.exports = { add, getUserEmail };