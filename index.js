const express = require('express');
const path = require('path');
const routesForUsers = require('./router/routesForUsers');
const routesForLogin = require('./router/routesForLogin');
const routeForRecipes = require('./router/routesForRecipes');

require('dotenv').config();

const app = express();
app.use(express.json());
// app.use(express.static(`${__dirname}/uploads`));

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routesForUsers);
app.use('/login', routesForLogin);
app.use('/recipes', routeForRecipes);
app.use('/images', express.static(path.resolve(`${__dirname}/uploads`)));

app.listen(PORT, () => { console.log(`Operational on port ${PORT}`); });