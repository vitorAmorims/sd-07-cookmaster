const express = require('express');

const app = express();

// import users
const { loginMiddleware } = require('../Middlewares/Users/loginMiddleware');
const { middlewareCreateUser } = require('../Middlewares/Users/createUserMiddleware');
const { createUser } = require('../Controllers/Users/createUserController');
const { loginController } = require('../Controllers/Users/loginController');
// Import recipes
const { addRecipeMiddleware } = require('../Middlewares/Recipes/addRecipeMiddleware');
const { addRecipeController } = require('../Controllers/Recipes/addRecipeController');
const { getAllRecipesMiddleware } = require('../Middlewares/Recipes/getAllRecipesMiddleware');
const { getAllRecipesController } = require('../Controllers/Recipes/getAllRecipesController');
// routes
app.get('/', (_request, response) => {
    response.send();
});

app.post('/users', middlewareCreateUser, createUser);
app.post('/login', loginMiddleware, loginController);
app.post('/recipes', addRecipeMiddleware, addRecipeController);
app.get('/recipes', getAllRecipesMiddleware, getAllRecipesController);

module.exports = app;