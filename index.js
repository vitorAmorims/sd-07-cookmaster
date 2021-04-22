const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./routes/user/userController');
const loginController = require('./routes/login/loginController');
const recipeController = require('./routes/recipes/recipeController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipeController);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });