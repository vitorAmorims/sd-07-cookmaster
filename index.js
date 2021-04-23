const express = require('express');

const { users, recipes } = require('./src/routers');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send('Projeto CookMaster');
});

app.use(users);
app.use(recipes);

app.use((err, _req, res, _next) => {
  const { message, status } = err;
  res.status(status).json({
    message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('API rodando na porta 3000');
});
