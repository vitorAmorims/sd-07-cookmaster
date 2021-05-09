const express = require('express');

const imagesRoute = require('./routes/imagesRoute');
const usersRoute = require('./routes/usersRoute'); 

const app = express();
app.use(express.json());

app.use(imagesRoute);
app.use(usersRoute);

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });