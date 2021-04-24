const express = require('express');
const routesForUsers = require('./router/routesForUsers');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.ACCESS_PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routesForUsers);

app.listen(PORT, () => { console.log(`Operational on port ${PORT}`); });