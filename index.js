const express = require('express');
const routesForUsers = require('./router/routesForUsers');
const routesForLogin = require('./router/routesForLogin');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routesForUsers);
app.use('/login', routesForLogin);

app.listen(PORT, () => { console.log(`Operational on port ${PORT}`); });