const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

const User = require('./controller/user');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/users', User.addUser);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });