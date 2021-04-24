const express = require('express');
const { usersRoute, recipesRoute } = require('./routes');

const app = express();

const PORT = 3000;
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(usersRoute);
app.use(recipesRoute);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });