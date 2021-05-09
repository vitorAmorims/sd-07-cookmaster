const { findUserByEmail } = require('../models/ModelUsers');
const status = require('./statusCodes');

const validUserLogin = async (data) => {
  const { email, password } = data;
  
    const dbPassword = await findUserByEmail(email);
    if (!dbPassword || !email || !password) throw status.loginUserAlredyVerify;
    if (password !== dbPassword.password) throw status.loginUserAlredyVerify;
};

module.exports = validUserLogin;
