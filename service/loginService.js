const loginModel = require('../model/loginModel');

const login = async (email, password) => {
  try {
    return loginModel.login(email, password);
  } catch (error) {
    console.error({ message: 'Não entrou no service' });
  }
};

module.exports = {
  login,
};
