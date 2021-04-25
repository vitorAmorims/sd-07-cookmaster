const express = require('express');

const app = express();

const { userRoute, authRoute, recipeRoute } = require('./src/routes');

const PORT = 3000;

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', userRoute);
app.use('/', authRoute);
app.use('/', recipeRoute);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });