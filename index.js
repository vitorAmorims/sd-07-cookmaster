const express = require('express');
const path = require('path');
require('dotenv').config();
const { usersRoute, recipesRoute } = require('./routes');
const { errorMiddleware } = require('./middlewares');

const app = express();
app.use(express.json());

const { PORT } = process.env;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(usersRoute);
app.use(recipesRoute);
app.use(errorMiddleware);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });