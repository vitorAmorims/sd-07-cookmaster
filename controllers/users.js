const express = require('express');
const {
  errorMiddleware,
  createUserMidd,
  loginMidd,
  checkAdminPrivilege,
} = require('../middleware');
const {
  createUser,
  login,
  createAdmin,
} = require('../models/users');
const {
  createToken, authorizeToken,
} = require('../services/auth');

const app = express();

const OK = 200;
const CREATED = 201;
const INTERNAL_ERROR = 500;

app.post('/users', createUserMidd, async (request, response) => {
  const userData = request.body;

  try {
    const result = await createUser(userData);
    response.status(CREATED).send(result);
  } catch (err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.post('/users/admin',
  authorizeToken,
  checkAdminPrivilege,
  async (request, response) => {
  const adminData = request.body;

  try {
    const result = await createAdmin(adminData);
    response.status(CREATED).send(result);
  } catch (err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.post('/login', loginMidd, async (request, response) => {
  const loginData = request.body;

  try {
    const result = await login(loginData);
    const token = await createToken(result);
    response.status(OK).send({ token });
  } catch (err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.use(errorMiddleware);

module.exports = app;
