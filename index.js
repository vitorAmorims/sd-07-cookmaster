const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./src/routes/userRoute');
const loginRoute = require('./src/routes/loginRoute');

const constants = require('./src/const');

const app = express();
app.use(bodyParser.json());

app.use(userRoute);
app.use(loginRoute);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(constants.PORT, () => { console.log('API rodando na porta 3000'); });