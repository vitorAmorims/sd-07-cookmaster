const express = require('express');
const usersRoute = require('./Routes/usersRoute');
const loginRoute = require('./Routes/loginRoute');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(usersRoute, loginRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });