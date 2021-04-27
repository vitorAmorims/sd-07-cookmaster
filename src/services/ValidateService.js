const error = require('./Error_data');
const UsersModel = require('../models/UsersModel');

const validName = (name) => {  
    if (!name || name === '') throw error.INVALID_DATA_ERROR;
  };

  const validEmailType = (email) => {
    const REGEX = /\S+@\S+\.\S+/;
    return REGEX.test(email);
  };

  const validEmail = async (email) => {  
    if (!email || email === '') throw error.INVALID_DATA_ERROR;
  
    const testedEmail = validEmailType(email);
    if (!testedEmail) throw error.INVALID_DATA_ERROR;
  
    const existEmail = await UsersModel.findUserByEmail(email);
    if (existEmail) throw error.CONFLICT_EMAIL_ERROR;
  };

  const validPassword = (password) => {
    if (!password || password === '') throw error.INVALID_DATA_ERROR;
  };

  const validEmailLogin = (email) => {
    if (!email || email === '') throw error.EMPTY_LOGIN_DATA_ERROR;
    if (!validEmailType(email)) throw error.INVALID_LOGIN_DATA_ERROR; 
  };

  const validPasswordLogin = (password) => {
    if (!password || password === '') throw error.EMPTY_LOGIN_DATA_ERROR;
  };


const validLogin = (user, password) => {
    const isMatch = user.password === password;
    if (!isMatch) throw error.INVALID_LOGIN_DATA_ERROR;
  };

module.exports = { 
    validName, 
    validEmailType,
    validEmail,  
    validPassword,  
    validEmailLogin,
    validPasswordLogin,
    validLogin,
};