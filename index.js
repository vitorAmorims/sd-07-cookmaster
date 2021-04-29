const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

const validateJWT = require('./auth/validateJWT');
const User = require('./controller/user');
const Recipe = require('./controller/recipe');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', User.addUser);
app.post('/login', User.login);

app.post('/recipes', validateJWT, Recipe.addRecipe);
app.get('/recipes', Recipe.getRecipes);
app.get('/recipes/:id', Recipe.getRecipeById);
app.put('/recipes/:id', validateJWT, Recipe.editRecipeById);

app.listen(PORT, () => {
  console.log('API rodando na porta 3000');
});
