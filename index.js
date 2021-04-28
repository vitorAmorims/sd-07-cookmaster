require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { usersRoute, loginRoute, recipesRoute, imageRoute } = require('./routes');
const errorMiddleware = require('./middleware/error.js');

const app = express();

app.use(bodyParser.json());

const { PORT } = process.env;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(usersRoute);
app.use(loginRoute);
app.use(recipesRoute);
app.use(imageRoute);

app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });