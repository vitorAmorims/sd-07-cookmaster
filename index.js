const express = require('express');
const route = require('./routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', route.users);
app.use('/login', route.login);

const PORT = 3000;

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
