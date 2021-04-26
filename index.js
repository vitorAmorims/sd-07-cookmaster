const express = require('express');
const UserRouter = require('./src/routers/UserRouter');
const RecipeRouter = require('./src/routers/RecipeRouter');
const middleware = require('./src/middlewares');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.static(`${__dirname}/uploads`));

app.use(UserRouter);
app.use(RecipeRouter);

app.use(middleware.errorMiddleware);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });