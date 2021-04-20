const connection = require('../config/connection');
// const { ObjectID } = require('mongodb');

const login = async (email, password) => {
  try {
    const db = await connection();
    const user = await db.collection('users').findOne({
      email,
      password,
      role: 'user',
    });
    return user;
  } catch (error) {
    console.error({ message: 'Sem conexão com o banco' });
  }
};

module.exports = {
  login,
};
