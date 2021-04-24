const express = require('express');
const userRoute = require('./routes/userRoute');
const recipeRoute = require('./routes/recipeRoute');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRoute);
app.use(recipeRoute);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });