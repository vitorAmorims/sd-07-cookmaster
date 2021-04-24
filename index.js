const express = require('express');

const helmet = require('helmet');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

app.use(helmet());

const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

app.use(bodyParser.json({
  limit: '5mb',
}));

app.use(bodyParser.urlencoded({
  limit: '5mb',
  parameterLimit: 100000,
  extended: true,
  defer: true,
}));

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', require('./routes/users'));

app.use('/login', require('./routes/login'));

app.use('/recipes', require('./routes/recipes'));

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });