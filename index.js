const express = require('express');

const app = express();
const usersControllers = require('./controllers/usersControllers');

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersControllers.createUser);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });