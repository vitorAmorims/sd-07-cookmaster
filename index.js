const express = require('express');
const bodyParser = require('body-parser');
const { errMiddleware } = require('./middlewares');

const app = express();
const { loginRoute, recipeRoutes, userRoutes } = require('./routes');

const PORT = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API @ PORT 3000'); });

app.use('/users', userRoutes);
app.use('/login', loginRoute);
app.use('/recipe', recipeRoutes);

app.use(errMiddleware);