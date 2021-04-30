const express = require('express');
const router = require('./src/router');

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(router);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });