const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = 3000;

const usersRouter = require('./controllers/userControler');
const loginsRouter = require('./controllers/login');
const recipesRouter = require('./controllers/recipes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/login', loginsRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.listen(PORT, () => console.log('API rodando na porta 3000'));
