const userModel = require('../models/userModel');

function verifyEmail(email) {
  // https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469
  const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailRegex.test(email);
}

const registerUser = async (email, password, name) => {
  if (!name || !verifyEmail(email) || !password) {
    return { 
      erro: { message: 'Invalid entries. Try again.', status: 400 } };
  }

  const searchEmail = await userModel.getUserEmail(email);
  if (!verifyEmail(searchEmail)) {
    return {
      erro: {
        message: 'Email already registered',
        status: 409,
      },
    };
  }

  const register = await userModel.registerUser(email, password, name);
  console.log(register);
  return register;
};

module.exports = {
  registerUser,
};
