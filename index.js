const express = require('express');
const usersRoutes = require('./users/usersRotes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(usersRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });