const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', require('./src/routes/users'));

app.listen(process.env.PORT || PORT, () => { console.log('API rodando na porta 3000'); });
