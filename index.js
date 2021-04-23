const express = require('express');

const app = express();
const PORT_URL = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const usersRoutes = require('./routes/usersRoute');
const loginRoutes = require('./routes/loginsRoute');
const recipesRoutes = require('./routes/recipesRoute');

app.use(express.json());
app.use(usersRoutes);
app.use(loginRoutes);
app.use(recipesRoutes);

app.listen(PORT_URL, () => {
  console.log(`App ouvindo a porta ${PORT_URL}`);
});
