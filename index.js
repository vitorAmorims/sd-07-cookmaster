const express = require('express');
const userRoutes = require('./Routes/user');
const loginRoutes = require('./Routes/login');
const recipeRoutes = require('./Routes/recipe');

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRoutes);
app.use(loginRoutes);
app.use(recipeRoutes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });