const express = require('express');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const usersRoute = require('./src/routes/usersRoute');
const recipesRoute = require('./src/routes/recipesRoute');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(usersRoute);
app.use(recipesRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
