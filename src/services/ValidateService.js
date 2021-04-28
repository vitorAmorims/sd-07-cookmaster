const jwt = require('jsonwebtoken');
const error = require('./Error_data');
const UsersModel = require('../models/UsersModel');
const RecipesModel = require('../models/RecipesModel');

const validField = (arg) => {
    if (!arg || arg === '') throw error.INVALID_DATA_ERROR;
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

  const validToken = (token) => {    
    if (!token || token === '') throw error.MISSING_TOKEN_DATA_ERROR;    
  };

  const verifyToken = (token, secret) => {
    try {
      const value = jwt.verify(token, secret);
      return value;
    } catch (err) {
      throw error.INVALID_TOKEN_DATA_ERROR;  
    }    
  };

  const validRecipeId = async (id) => {
    const recipe = await RecipesModel.getRecipeById(id);
    if (!recipe) throw error.NOT_FOUND_RECIPE;
    return recipe; 
  };
  
module.exports = { 
    validField,
    validEmailType,
    validEmail,   
    validEmailLogin,
    validPasswordLogin,
    validLogin,
    validToken,
    verifyToken,
    validRecipeId,
    
};