const express = require('express');
const path = require('path');

const app = express();
const routes = require('./routes');

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(routes);

app.listen(PORT, () => {
  console.log('API rodando na porta 3000');
});
