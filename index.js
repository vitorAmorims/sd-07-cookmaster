const express = require('express');
const photoRoutes = require('./routes/uploadRoute.js');
const user = require('./routes/usersRoute');

const PORT = 3000;

const app = express();

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(user);
app.use(photoRoutes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });