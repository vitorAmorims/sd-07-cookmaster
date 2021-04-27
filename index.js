const express = require('express');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const recipesRoute = require('./routes/recipes');
const logMiddleware = require('./middlewares/logPath');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(logMiddleware);
app.use(usersRoute);
app.use(loginRoute);
app.use(recipesRoute);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });