const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

const secret = 'abc';

const createUser = async (name, email, password) => {
  const role = 'user';
  const newUser = await user.create(name, email, password, role);

  return newUser;
};

const loginUser = async (email) => { 
    const jwtConfig = {
      expiresIn: 60 * 5,
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: email }, secret, jwtConfig);
    const login = await user.findUser(email, token);
        
  return login;  
};

module.exports = {
  createUser,
  loginUser,
};