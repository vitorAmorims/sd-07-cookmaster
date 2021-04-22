const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
// app.use(express.static('uploads'));

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(routes.userRoute, routes.loginRoute, routes.recipeRoute, routes.imagesRoute);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
