const express = require('express');
const userRoute = require('./Users/userRoutes');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(userRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });