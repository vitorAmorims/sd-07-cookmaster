const express = require('express');

const app = express();
const routes = require('./routes');

const SERVER_PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes);

const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

app.use(errorHandlerMiddleware);
app.listen(SERVER_PORT, () => {
  console.log(`Online na porta ${SERVER_PORT}!`);
});
