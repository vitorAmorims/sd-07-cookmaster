const express = require('express');
const { usersRoutes } = require('./users');
// const recipesRoutes = require('./recipes/recipesRotes');
const { errorMiddleware } = require('./middleware');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(usersRoutes);
// app.use(recipesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });