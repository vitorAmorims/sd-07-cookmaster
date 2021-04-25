const userModel = require('../models/UserModel');

const create = async ({ name, email, password }) => { 
  const userExists = await userModel.findByEmail(email);
  if (!userExists) {
    const role = 'user';
    const insertedId = await userModel.create({ name, email, password, role });
    return { name, email, role, insertedId };
  }
  throw new Error('Usuário já existe');
};

const checkUserLogin = async ({ email, password }) => {
  const userExists = await userModel.findByEmail(email);
  if (userExists && userExists.password === password) {
    return true;
  }
  throw new Error('Senha ou Email inválidos');
};

module.exports = {
  create,
  checkUserLogin,
};
