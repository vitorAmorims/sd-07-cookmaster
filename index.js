const express = require('express');

const middlewares = require('./src/middleware');
const router = require('./src/router');

const app = express();

const PORT = 3001;
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response
    .status(SUCCESS)
    .send();
});

app.use(express.json());
app.use(middlewares.logMiddleware);
app.use(router.usersRoutes);
app.use(router.loginRoutes);
app.use(router.recipesRoutes);
// app.use(middlewares.errorMiddleware);

app.listen(PORT, () => {
  console.log('API rodando na porta', PORT);
});