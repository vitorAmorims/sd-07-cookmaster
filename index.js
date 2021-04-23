const express = require('express');
const { userRoutes } = require('./routes');

const app = express();

const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRoutes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });