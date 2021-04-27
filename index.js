const bodyParser = require('body-parser');
const express = require('express');
const UserRoutes = require('./routes/userRoute');
const RecipeRoutes = require('./routes/recipeRoute');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(UserRoutes);
app.use(RecipeRoutes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });