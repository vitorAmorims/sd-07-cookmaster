const express = require('express');
const { signup, login, recipes } = require('./routes');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use('/users', signup);
app.use('/login', login);
app.use('/recipes', recipes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });