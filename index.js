const express = require('express');
const path = require('path');

const route = require('./routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'uploads/')));

app.use('/users', route.users);
app.use('/login', route.login);
app.use('/recipes', route.recipes);

const PORT = 3000;

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
