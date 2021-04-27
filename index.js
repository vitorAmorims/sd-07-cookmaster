const express = require('express');
const usersRoute = require('./routes/usersRoute');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(usersRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
