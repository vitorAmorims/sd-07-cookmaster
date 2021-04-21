const express = require('express');

const app = express();
const usersControllers = require('./controllers/usersControllers');
const loginControllers = require('./controllers/loginController');
const recipesControllers = require('./controllers/recipesController');
const authMiddleware = require('./middlewares/auth');

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersControllers.createUser);

app.post('/login', loginControllers.validateLogin);

app.post('/recipes', authMiddleware, recipesControllers.createRecipe);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });