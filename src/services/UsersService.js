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
  ValidateService.validField(name);
    await ValidateService.validEmail(email);
    ValidateService.validField(password);
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
    const { _id, role } = user;
    const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
    return token;
  };

  const findByUserEmailLogin = async (email) => {
    const user = await UsersModel.findUserByEmail(email);
    if (!user) throw error.INVALID_LOGIN_DATA_ERROR;  
    return user;
  };
  
module.exports = { create, readAllUsers, findByUserEmail, findByUserEmailLogin };
