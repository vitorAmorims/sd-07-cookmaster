const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', require('./controller/userController'));

// teste

app.listen(PORT, () => { console.log('API rodando na porta 3000 - ', Date()); });