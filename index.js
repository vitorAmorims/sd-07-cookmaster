const express = require('express');

const { routerUser, routerRecipe } = require('./routes');

const { errorMiddleware } = require('./Middlewares');

const { PORT } = require('./CODE_ERROR');

const app = express();

app.use(express.json());

// routerUser

const router = [routerUser, routerRecipe];

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
