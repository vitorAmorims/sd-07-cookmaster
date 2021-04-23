const express = require('express');
const routes = require('./routes');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(routes.userRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
