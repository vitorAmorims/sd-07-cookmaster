const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const recipesController = require('./controllers/recipesController');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);
app.use('/login', loginController);
app.use('/recipes', recipesController);

// app.use('/teste', (request, response) => {
//   response.send('tudo funcionando por aqui');
// });
app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });