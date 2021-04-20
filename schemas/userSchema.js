const userModel = require('../models/usersModels');
// validação feita om ajuda dos videos do conteudo da aulda do dia 27.2

const errors = {
  noNameOrEmailField: 'Invalid entries. Try again.',
  existentEmail: 'Email already registered',
};

const badRequest = 400;
const conflict = 409;

function validatingEmail(email) {
  const re = /^.+@.+$/i;

  return re.test(email);
}

const validatePost1 = async (name, email, password) => {
  if (!name || !email || !password) return { code: badRequest, message: errors.noNameOrEmailField };

  return {};
};

const validatePost2 = async (email) => {
  const userEmail = await userModel.getUserByEmail(email);

  if (!validatingEmail(email)) return { code: badRequest, message: errors.noNameOrEmailField };

  if (userEmail) return { code: conflict, message: errors.existentEmail };

  return {};
};

module.exports = {
  validatePost1,
  validatePost2,
};