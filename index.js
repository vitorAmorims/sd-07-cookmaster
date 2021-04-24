const express = require('express');
const routesForUsers = require('./router/routesForUsers');
const routesForLogin = require('./router/routesForLogin');
const routeForRecipes = require('./router/routesForRecipes');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routesForUsers);
app.use('/login', routesForLogin);
app.use('/recipes', routeForRecipes);

app.listen(PORT, () => { console.log(`Operational on port ${PORT}`); });