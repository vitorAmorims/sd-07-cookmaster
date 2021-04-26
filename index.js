const express = require('express');
const userRoute = require('./routes/userRoute');
const loginRoute = require('./routes/loginRoute');
const recipesRoute = require('./routes/recipesRoute');

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRoute);
app.use(loginRoute);
app.use(recipesRoute);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });