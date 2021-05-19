const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const { users, login, recipes } = require('./src/routes');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send().send('Deu certo!');
});

app.use(login);
app.use(users);
app.use(recipes);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((err, _req, res, _next) => {
  const { message, status = 401 } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
