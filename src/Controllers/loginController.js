// const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { findOneUser } = require('../Models/usersModel');

const secret = '5b5b54c8989af811caee7ea0f5811b70';

const createNewLogin = async (req, res) => {
  const { email } = req.body;
  const user = await findOneUser(email);
  const data = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign({ data }, secret);
  res.status(200).json({ token });
};

const getAllLogin = async (req, res) => {
  res.status(200).json('login router');
};

module.exports = {
  createNewLogin,
  getAllLogin,
  secret,
};
