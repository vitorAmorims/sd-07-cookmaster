const connect = require('../config/connection');

const nonDb = 'Sem conexão com o banco';

const createUser = async (name, email, password) => {
  try {
    console.log('entro em Models');
    return await connect()
      .then((db) => db.collection('users')
        .insertOne({ name, email, password, role: 'user' }));
  } catch (error) {
    console.log('ERRO em Models');
    console.error({ message: nonDb });
  }
};

const findByEmail = async (email) => {
  try {
    return await connect()
      .then((db) => db.collection('users')
        .findOne({ email }));
  } catch (error) {
    console.error({ message: nonDb });
  }
};

const login = async (email, password) => {
  try {
    return await connect()
      .then((db) => db.collection('users')
        .findOne({ email, password, role: 'user' }));
  } catch (error) {
    console.error({ message: nonDb });
  }
};

module.exports = { createUser, findByEmail, login };
