const usersModel = require('../model/usersModel');

const ERRO = 'Não entrou no service';

const createUser = async (name, email, password) => {
    try {
      return await usersModel.createUser(name, email, password);
    } catch (error) {
      console.error({ message: ERRO });
    }
  };

  const findEmail = async (email) => {
    try {
      return await usersModel.findEmail(email);
    } catch (error) {
      console.error({ message: ERRO });
    }
  };
  
  const findUser = async (name) => {
    try {
      return await usersModel.findUser(name);
    } catch (error) {
      console.error({ message: ERRO });
    }
  };
module.exports = {
  createUser,
  findEmail,
  findUser,
};