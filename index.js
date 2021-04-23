const express = require('express');
// const path = require('path');
const { UserRoute, RecipesRoute } = require('./routes');
const { errorMiddleware } = require('./middlewares');

const PORT = 3000;
const app = express();
app.use(express.json());
// app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(UserRoute);
app.use(RecipesRoute);
app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });