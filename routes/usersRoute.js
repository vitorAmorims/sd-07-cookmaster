const express = require('express');

const {
  createUser,
} = require('../controllers/usersController');

const {
  userDataValidation,
  checkDuplicate,
} = require('../middlewares');

const usersRoute = express.Router();

usersRoute.post('/', userDataValidation, checkDuplicate, createUser);

module.exports = usersRoute;