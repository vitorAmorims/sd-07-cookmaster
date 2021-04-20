const express = require('express');

const app = express.Router();

const loginController = require('../controllers/loginController');
const loginMiddleware = require('../middlewares/loginMiddleware');

app.post('/', loginMiddleware, loginController.login);

module.exports = app;
