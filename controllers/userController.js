const jwt = require('jsonwebtoken');
const { addUserDB } = require('../models/userModel');

const jwtConfig = {
  expiresIn: '7d',
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

module.exports = {
  addUser,
  userLogin,
};
