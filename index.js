const express = require('express');

const app = express();
const PORT = 3000;

const appRoutes = require('./src/routes');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(appRoutes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });