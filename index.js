const express = require('express');
const usersRouter = require('./src/routers');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(usersRouter);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });