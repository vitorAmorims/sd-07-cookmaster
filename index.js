const express = require('express');

const app = express();

app.use(express.json());
const userController = require('./controllers/userController');

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', userController);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });