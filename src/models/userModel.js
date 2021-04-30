const connect = require('../config/connection');

const createUser = async (name, email, password) => {
  try {
    console.log('entro em Models');
    const db = await connect();
    const user = await db
      .collection('users')
      .insertOne({ name, email, password, role: 'user' });
    console.log('saiu de Models');
    return user;
  } catch (error) {
    console.log('ERRO em Models');
    console.error({ message: 'Sem conexão com o banco' });
  }
};

module.exports = { createUser };
