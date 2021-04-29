const { router } = require('./routes');

const express = require('express');

const { errorMiddleware } = require('./Middlewares');

const { PORT } = require('./CODE_ERROR');

const app = express();

app.use(express.json());

app.use(router);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
