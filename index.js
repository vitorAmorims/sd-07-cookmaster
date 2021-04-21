const express = require('express');
const routes = require('./routes');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('rodando na porta 3000.'));
