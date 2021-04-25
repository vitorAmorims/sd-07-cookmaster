const express = require('express');
const userController = require('./src/controllers/UserController');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userController);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });