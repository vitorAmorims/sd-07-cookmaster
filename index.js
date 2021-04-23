const express = require('express');
const routes = require('./routes');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes.userRoutes);
app.use(routes.recipeRoutes);
app.listen(PORT, () => { console.log('API rodando na porta 3000'); });