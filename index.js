const express = require('express');
const routes = require('./routes/routes');

// const uploads = 'uploads/';
const app = express();
app.use('/images', express.static(`${__dirname}/uploads`));

// app.use(express.static(`__dirname ${uploads} `));
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(routes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
