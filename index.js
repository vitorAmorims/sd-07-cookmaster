const express = require('express');
const path = require('path');
const userRoute = require('./Users/userRoutes');
const loginRoute = require('./Login/loginRoutes');
const recipeRoute = require('./Recipes/recipeRoutes');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'uploads'))); // req. 10
app.use(userRoute);
app.use(loginRoute);
app.use(recipeRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });