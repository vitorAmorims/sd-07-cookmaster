const express = require('express');

const usersRoute = require('./src/routes/usersRoute.js');
const loginRoute = require('./src/routes/loginRoute.js');
const recipeRoute = require('./src/routes/recipeRoute.js');
const imgRoute = require('./src/routes/imgRoute.js');
const errorMiddleware = require('./src/middlewares/errorMiddleware.js');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.use(usersRoute);
app.use(loginRoute);
app.use(recipeRoute);
app.use(imgRoute);

app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
