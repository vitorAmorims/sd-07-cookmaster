const express = require('express');

const errorMiddleware = require('./src/middlewares/error');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('API rodando na porta 3000');
});
