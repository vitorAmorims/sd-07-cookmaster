const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

app.use(bodyParser.json({
  limit: '5mb',
}));

app.use(bodyParser.urlencoded({
  limit: '5mb',
  parameterLimit: 100000,
  extended: true,
  defer: true,
}));

const routesUsers = require('./Routes/UserRoutes');
const routesLogin = require('./Routes/LoginRoutes');
const routesRecipes = require('./Routes/RecipesRoutes');

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routesUsers);
app.use('/login', routesLogin);
app.use('/recipes', routesRecipes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });