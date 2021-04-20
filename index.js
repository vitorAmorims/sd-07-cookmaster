const express = require('express');
require('dotenv').config();

const usersRoute = require('./routes/usersRoute');

const { PORT } = process.env;

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('users', usersRoute);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });