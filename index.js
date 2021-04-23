const express = require('express');
const path = require('path');
const usersRoutes = require('./routes/usersRoutes');
const recipesRoutes = require('./routes/recipesRoutes');

const app = express();

app.use(express.json());
app.use(usersRoutes);
app.use(recipesRoutes);
app.use(express.static(path.join(__dirname, '/images')));

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
