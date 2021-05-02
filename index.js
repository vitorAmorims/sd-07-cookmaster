const express = require('express');
const path = require('path');
const { usersRoutes } = require('./users');
const { recipesRoute } = require('./recipes');
const { errorMiddleware } = require('./middleware');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(usersRoutes);
app.use(recipesRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('API ativa na porta 3000'); });