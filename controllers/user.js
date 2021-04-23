const jwt = require('jsonwebtoken');
const user = require('../services/user');
const modelUser = require('../models/user');

const CREATED = 201;
const BAD_REQUEST = 400;
const CONFLICT = 409;
const OK = 200;

const secret = 'meutoken';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  const { email } = req.body;

  const userData = await modelUser.findByEmail(email); 
  console.log(userData); 
  
  const token = jwt.sign({ data: userData }, secret, jwtConfig);
  res.status(OK).json({ token });
};

const create = async (req, res) => {
  const { email, password, name } = req.body;

  const result = await user.create(email, password, name);

  if (result.message) return res.status(BAD_REQUEST).json(result);

  if (result.conflict) return res.status(CONFLICT).json({ message: 'Email already registered' });

  res.status(CREATED).json(result);
};

const getAllRecipes = async (_req, res) => {
  const result = await user.getAllRecipes();

  // if (result.message) return res.status(BAD_REQUEST).json(result);

  res.status(201).json(result);
};
const createRecipes = async (req, res) => {
  const { name, ingredients, preparation, userName } = req.body;
  const { token } = req.headers;

  const result = await user.createRecipes(name, ingredients, preparation, userName);

  if (result.message) return res.status(BAD_REQUEST).json(result);

  // if (result.conflict) return res.status(CONFLICT).json({ message: 'Email already registered' });

  res.status(CREATED).json(result);
};

module.exports = {
  // deleteProduct,
  // updateById,
  // getAll,
  // findById,
  getAllRecipes,
  createRecipes,
  login,
  create,
};
