const express = require('express');
const usersRouters = require('./src/routes/usersRoutes');
const loginRouters = require('./src/routes/loginRoutes');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(usersRouters);
app.use(loginRouters);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
