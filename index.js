const express = require('express');

const app = express();
const usersControllers = require('./controllers/usersControllers');
const loginControllers = require('./controllers/loginController');
const recipesControllers = require('./controllers/recipesController');
const authMiddleware = require('./middlewares/auth');
const authUpdateMiddleware = require('./middlewares/updateRecipAuth');

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersControllers.createUser);

app.post('/login', loginControllers.validateLogin);

app.post('/recipes', authMiddleware, recipesControllers.createRecipe);

app.get('/recipes/:id', recipesControllers.findById);

app.put('/recipes/:id', authUpdateMiddleware, recipesControllers.updateRecipe);

app.get('/recipes', recipesControllers.findAllRecipes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });