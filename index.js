const express = require('express');
require('dotenv').config();

const usersRoute = require('./routes/usersRoute');
const recipesRoute = require('./routes/recipesRoute');

const { errorMiddleware } = require('./middlewares');

const { PORT } = process.env;

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', usersRoute);

app.use('/', recipesRoute);

app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });