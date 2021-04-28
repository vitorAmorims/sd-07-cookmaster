const express = require('express');
const routes = require('./src/routes');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(routes.usersRoutes);
app.use(routes.recipesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });