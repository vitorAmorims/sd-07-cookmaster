const express = require('express');
const userRouteres = require('./src/routes/userRoutes');
const loginRouter = require('./src/routes/loginRoute');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/users', userRouteres);
app.use('/login', loginRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });