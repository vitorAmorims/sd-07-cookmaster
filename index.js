const express = require('express');
const { user } = require('./routes');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});


app.use(express.json());
app.use('/users', user);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });