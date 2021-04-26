// const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/UsersModel');

const secret = 'secreteCrypt';
const jwtConfig = {
  expiresIn: 60 * 5,
  algorithm: 'HS256',
};

const INVALID_DATA_ERROR = {
  code: 'bad_request',
  message: 'Invalid entries. Try again.',
};

const CONFLICT_EMAIL_ERROR = {
  code: 'conflict',
  message: 'Email already registered',
};

const EMPTY_LOGIN_DATA_ERROR = {
  code: 'unauthorized',
  message: 'All fields must be filled',
};

const INVALID_LOGIN_DATA_ERROR = {
  code: 'unauthorized',
  message: 'Incorrect username or password',
};

const validName = (name) => {  
  if (!name || name === '') throw INVALID_DATA_ERROR;
};

const validEmailType = (email) => {
  const REGEX = /\S+@\S+\.\S+/;
  return REGEX.test(email);
};

const validEmail = async (email) => {  
  if (!email || email === '') throw INVALID_DATA_ERROR;

  const testedEmail = validEmailType(email);
  if (!testedEmail) throw INVALID_DATA_ERROR;

  const existEmail = await UsersModel.findUserByEmail(email);
  if (existEmail) throw CONFLICT_EMAIL_ERROR;
};

const validPassword = (password) => {
  if (!password || password === '') throw INVALID_DATA_ERROR;
};

const create = async (name, email, password, role) => {  
    validName(name);
    await validEmail(email);
    validPassword(password);
    // const salt = bcrypt.genSaltSync(5);
    // const cryptPassword = bcrypt.hashSync(password, salt);
    const newUser = await UsersModel.create(name, email, password, role);
    return newUser;
  };

  const readAllUsers = async () => {
    const users = await UsersModel.readAllUsers();
    return users;
  };  
  
  const validEmailLogin = (email) => {
  if (!email || email === '') throw EMPTY_LOGIN_DATA_ERROR;
  if (!validEmailType(email)) throw INVALID_LOGIN_DATA_ERROR; 
};

const validPasswordLogin = (password) => {
  if (!password || password === '') throw EMPTY_LOGIN_DATA_ERROR;
};

const validLogin = (user, password) => {
  const isMatch = user.password === password;
  if (!isMatch) throw INVALID_LOGIN_DATA_ERROR;
};

  const findByUserEmail = async (email, password) => {
    validEmailLogin(email);
    validPasswordLogin(password);  
    const user = await UsersModel.findUserByEmail(email);
    if (!user) throw INVALID_LOGIN_DATA_ERROR;  
    validLogin(user, password);
    const token = jwt.sign({ data: user.email }, secret, jwtConfig);  
    return token;
  };
  
module.exports = { create, readAllUsers, findByUserEmail };
