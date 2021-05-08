const express = require('express');

const app = express();

app.use(express.json());

const { recipeRoutes, loginRoutes, userRoutes } = require('./routers');

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', recipeRoutes);
app.use('/', loginRoutes);
app.use('/', userRoutes);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });