const express = require('express');
const routes = require('./src/routes');

const app = express();
const PORT = 3000;
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(routes);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
