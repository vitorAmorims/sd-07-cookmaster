const express = require('express');
const usersRoute = require('./src/routes/usersRoute');
const recipesRoute = require('./src/routes/recipesRoute');

const app = express();

app.use(express.json());
app.use(usersRoute);
app.use(recipesRoute);
app.use(express.static(__dirname + '/uploads'));

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });