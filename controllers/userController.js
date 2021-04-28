const jwt = require('jsonwebtoken');
const { addUserDB } = require('../models/userModel');
const { addRecipeDB } = require('../models/userModel');
const { getAllRecipesDB } = require('../models/userModel');
const { getRecipeDB } = require('../models/userModel');
const { editRecipeDB } = require('../models/userModel');

const jwtConfig = {
  expiresIn: '2m',
  algorithm: 'HS256',
};

const secret = 'secretToken';
// const bcrypt = require('bcrypt-nodejs');

const SUCCESS = 200;
const CREATED = 201;

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await addUserDB(name, email, password);
  // console.log(`data em addUser: ${data}`);
  res.status(CREATED).json(data);
};

const userLogin = async (req, res) => {
  const { password } = req.body;
  const token = jwt.sign({ data: password }, secret, jwtConfig);
  // let password = req.body.password;
  // const salt = bcrypt.genSaltSync(3);
  // password = bcrypt.hashSync(password, salt);
  // console.log(`token em userLogin: ${token}`);
  res.status(SUCCESS).json({
    token,
  });
};

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const data = await addRecipeDB(name, ingredients, preparation);
  // console.log(`data em addRecipe: ${data}`);
  res.status(CREATED).json(data);
};

const getAllRecipes = async (req, res) => {
  const data = await getAllRecipesDB();
  // console.log(`data em getAllRecipes: ${data}`);
  res.status(SUCCESS).json(data);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  const data = await getRecipeDB(id);
  // console.log(`data em getRecipe: ${data}`);
  res.status(SUCCESS).json(data);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const data = await editRecipeDB(id, name, ingredients, preparation);
  // console.log(`data em editRecipe: ${data}`);
  res.status(SUCCESS).json(data);
};

module.exports = {
  addUser,
  userLogin,
  addRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
};
