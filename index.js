const express = require('express');

const usersRoute = require('./src/routes/usersRoute');
const errorMiddleware = require('./src/middlewares/error');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.use(usersRoute);
app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => {
  console.log('API rodando na porta 3000');
});
