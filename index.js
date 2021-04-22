const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', require('./src/routes/users'));
app.use('/login', require('./src/routes/login'));
app.use('/recipes', require('./src/routes/recipes'));

app.listen(process.env.PORT || PORT, () => { console.log('API rodando na porta 3000'); });
