const userModel = require('../models/usersModels');
// validação feita om ajuda dos videos do conteudo da aulda do dia 27.2

const errors = {
  emptyField: 'All fields must be filled',
  icorrectEmailOrPassword: 'Incorrect username or password',
};

const unauthorized = 401;

const validateLogin = async (email, password) => {
  const userEmail = await userModel.getUserByEmail(email);

  if (!email || !password) return { code: unauthorized, message: errors.emptyField };

  if (password.length < 5) return { code: unauthorized, message: errors.icorrectEmailOrPassword };

  if (!userEmail) return { code: unauthorized, message: errors.icorrectEmailOrPassword };

  return {};
};

module.exports = {
  validateLogin,
};