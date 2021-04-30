const connect = require('../config/connection');

const createUser = async (name, email, password) => {
  try {
    console.log('entro em Models');
    return await connect()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role: 'user' }));
  } catch (error) {
    console.log('ERRO em Models');
    console.error({ message: 'Sem conexão com o banco' });
  }
};

module.exports = { createUser };
