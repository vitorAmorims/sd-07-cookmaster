const express = require('express');

const {
  createUser,
} = require('../controllers/usersController');

const usersRoute = express.Router();

usersRoute.post('/', createUser);

module.exports = usersRoute;