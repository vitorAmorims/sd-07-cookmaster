const express = require('express');
require('dotenv').config();
const { errorMiddleware } = require('./middlewares');

const app = express();
app.use(express.json());

const { PORT } = process.env;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });