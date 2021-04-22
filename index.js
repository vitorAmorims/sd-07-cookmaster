const express = require('express');

const app = express();
const users = require('./src/routes/usersRouter');
const recipes = require('./src/routes/recipesRouter');

const PORT = 3000;
app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.use(express.static('uploads/'))
app.use('/', users);
app.use('/', recipes);

app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });