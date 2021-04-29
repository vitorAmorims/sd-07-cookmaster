const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const appRoutes = require('./src/routes');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(appRoutes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });