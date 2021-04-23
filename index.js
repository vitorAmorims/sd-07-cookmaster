const express = require('express');
const routes = require('./routes');
const app = express();
const path = require('path');

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes.usersRoutes);
app.use(routes.recipesRoutes);
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
