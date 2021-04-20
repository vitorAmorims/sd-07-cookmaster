const connection = require('../config/connection');
// const { ObjectID } = require('mongodb');

const createUser = async (name, email, password) => {
  try {
    const db = await connection();
    const user = await db
      .collection('users')
      .insertOne({
        name,
        email,
        password,
        role: 'user',
      });
    return user;
  } catch (error) {
    console.error({ message: 'Sem conexão com o banco' });
  }
};

const findEmail = async (email) => {
  try {
    const db = await connection();
    return await db
      .collection('users')
      .findOne({ email });
  } catch (error) {
    console.error({
      message: 'Não tem email com esse nome no banco',
    });
  }
};

const findUser = async (name) => {
  try {
    const db = await connection();
    return await db
      .collection('users')
      .findOne({ name });
  } catch (error) {
    console.error({
      message: 'Não tem usuario com esse nome no banco',
    });
  }
};
module.exports = {
  createUser,
  findEmail,
  findUser,
};