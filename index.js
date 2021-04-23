const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(express.static(`${__dirname}/images/`));

const users = require('./routes/usersRoute');
const login = require('./routes/loginRoute');
const recipes = require('./routes/recipesRoute');

app.use('/recipes', recipes);
app.use('/users', users);
app.use('/login', login);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });