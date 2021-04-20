const express = require('express');

const app = express.Router();

const usersController = require('../controllers/usersController');
const createUsersMiddleware = require('../middlewares/createUsersMiddleware');

app.post('/', createUsersMiddleware, usersController.createUser);

module.exports = app;
