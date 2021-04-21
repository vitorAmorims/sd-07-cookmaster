const express = require('express');
const bodyParser = require('body-parser');
const user = require('./controllers/user');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', user.create);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });