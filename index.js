const express = require('express');
const userRoutes = require('./src/routes/user');
const recipesRoutes = require('./src/routes/recipes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

const PORT = 3000;

app.use(userRoutes);
app.use(recipesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });