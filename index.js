const express = require('express');
const photoRoutes = require('./routes/uploadRoute.js');
const user = require('./routes/usersRoute');
const recipes = require('./routes/recipesRoute');

const PORT = 3000;

const app = express();

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use(express.static(`${__dirname}/images`));

app.use(user);
app.use(recipes);
app.use(photoRoutes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });