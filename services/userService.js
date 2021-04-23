const user = require('../models/userModel');

const createUser = async (name, email, password) => {
  const role = 'user';
  const newUser = await user.create(name, email, password, role);

  return newUser;
};

const loginUser = async (email) => { 
  const login = await user.findUser(email);
        
  return login;  
};

module.exports = {
  createUser,
  loginUser,
};