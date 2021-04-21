const express = require('express');
const usersRoute = require('./routes/userRoutes');
const loginRoute = require('./routes/loginRoutes');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(usersRoute);
app.use(loginRoute);

app.listen(PORT, () => {
  console.log(`App ouvindo na porta ${PORT}`);
});