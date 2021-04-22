const express = require('express');

const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.json());

const routesUsers = require('./routes/users');

const routesLogin = require('./routes/login');

const routesRecipes = require('./routes/recipes');

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routesUsers);

app.use('/login', routesLogin);

app.use('/recipes', routesRecipes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });