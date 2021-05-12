const express = require('express');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/teste', (request, response) => {
  response.send('tudo funcionando por aqui');
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });