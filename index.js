const express = require('express');
const bodyParser = require('body-parser');
const user = require('./controllers/user');
const validateJWT = require('./auth/validateJWT');
const validateUser = require('./middlewares/validateUser');
const validateGetAllRecipes = require('./auth/validateGetAllRecipes');

const recipeIdRoute = '/recipes/:id';

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', user.create);
app.post('/login', validateUser, user.login);
app.post('/recipes', validateJWT, user.createRecipes);
app.get('/recipes', validateGetAllRecipes, user.getAllRecipes);
app.get(recipeIdRoute, validateGetAllRecipes, user.findRecipeById);
app.delete(recipeIdRoute, validateJWT, user.deleteRecipeById);
app.put(recipeIdRoute, validateJWT, user.updateRecipeById);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });