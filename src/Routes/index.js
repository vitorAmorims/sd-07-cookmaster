const express = require('express');
const { loginMiddleware } = require('../Middlewares/Users/loginMiddleware');

const app = express();

// import users
const { middlewareCreateUser } = require('../Middlewares/Users/createUserMiddleware');
const { createUser } = require('../Controllers/Users/createUserController');
const { loginController } = require('../Controllers/Users/loginController');
// Import recipes

// routes
app.get('/', (_request, response) => {
    response.send();
});

app.post('/users', middlewareCreateUser, createUser);
app.post('/login', loginMiddleware, loginController);

module.exports = app;