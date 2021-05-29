const express = require('express');
const { resolve } = require('path');
const UserRoutes = require('./routes/UserRoutes');
const RecipeRoutes = require('./routes/RecipeRoutes');

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/images', express.static(resolve(__dirname, 'uploads')));

app.use(UserRoutes, RecipeRoutes);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });