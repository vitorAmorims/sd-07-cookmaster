const express = require('express');

const app = express();
const usersControllers = require('./controllers/usersControllers');
const loginControllers = require('./controllers/loginController');
const recipesControllers = require('./controllers/recipesController');
const authMiddleware = require('./middlewares/auth');
const authUpdateMiddleware = require('./middlewares/updateRecipAuth');
const deleteMiddleware = require('./middlewares/deleteMiddleware');

const PORT = 3000;
const RECIPES_PATH = '/recipes';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersControllers.createUser);

app.post('/login', loginControllers.validateLogin);

app.post('/recipes', authMiddleware, recipesControllers.createRecipe);

app.get(`${RECIPES_PATH}/:id`, recipesControllers.findById);

app.put(`${RECIPES_PATH}/:id`, authUpdateMiddleware, recipesControllers.updateRecipe);

app.delete(`${RECIPES_PATH}/:id`, deleteMiddleware, recipesControllers.deleteRecipe);

app.get('/recipes', recipesControllers.findAllRecipes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });