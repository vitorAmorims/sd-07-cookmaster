const express = require('express');
const users = require('./src/routes/users');
const login = require('./src/routes/login');

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(users);
app.use(login);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });