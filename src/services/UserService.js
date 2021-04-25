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

module.exports = {
  create,
};
