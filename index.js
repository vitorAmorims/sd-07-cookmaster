const express = require('express');
const { usersRoutes } = require('./routes');
const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(usersRoutes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });