const express = require('express');
const { Users, Login } = require('./routes');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(Users);
app.use(Login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });