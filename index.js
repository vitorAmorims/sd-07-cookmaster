const express = require('express');
const { imageRoute, loginRoute, recipeRoute, userRoute } = require('./Routes');

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRoute);
app.use(loginRoute);
app.use(recipeRoute);
app.use(imageRoute);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });