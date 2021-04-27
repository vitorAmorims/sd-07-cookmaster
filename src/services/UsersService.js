const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');
const ValidateService = require('./ValidateService');
const error = require('./Error_data');

const secret = 'secreteCrypt';
const jwtConfig = {
  expiresIn: 60 * 5,
  algorithm: 'HS256',
};

const create = async (name, email, password, role) => {  
  ValidateService.validName(name);
    await ValidateService.validEmail(email);
    ValidateService.validPassword(password);
    const newUser = await UsersModel.create(name, email, password, role);
    return newUser;
  };

  const readAllUsers = async () => {
    const users = await UsersModel.readAllUsers();
    return users;
  };  

  const findByUserEmail = async (email, password) => {
    ValidateService.validEmailLogin(email);
    ValidateService.validPasswordLogin(password);  
    const user = await UsersModel.findUserByEmail(email);
    if (!user) throw error.INVALID_LOGIN_DATA_ERROR;  
    ValidateService.validLogin(user, password);
    const token = jwt.sign({ data: user.email }, secret, jwtConfig);  
    return token;
  };
  
module.exports = { create, readAllUsers, findByUserEmail };
