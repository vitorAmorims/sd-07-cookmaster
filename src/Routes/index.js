const express = require('express');

const app = express();

// import users
const { middlewareCreateUser } = require('../Middlewares/Users/createUserMiddleware');
const { createUser } = require('../Controllers/Users/createUserController');
// Import recipes

// routes
app.get('/', (request, response) => {
    response.send();
});

app.post('/users', middlewareCreateUser, createUser);

module.exports = app;