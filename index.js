const express = require('express');

const usersRoutes = require('./routes/usersRoutes');

const app = express();

app.use(express.json());
app.use(usersRoutes);

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });