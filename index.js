const express = require('express');
const rescue = require('express-rescue');
// require('dotenv').config();

const status = require('./httpStatusCodes');
const MissingTokenError = require('./errors/MissingTokenError');
const usersRoute = require('./routes/usersRoute');
const recipesRoute = require('./routes/recipesRoute');

const PORT = 3000;

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', usersRoute);

app.use('/', recipesRoute);

app.use(rescue.from(MissingTokenError, (_err, _req, res, _next) => {
  res.status(status.UNAUTHORIZED).json({ message: 'missing auth token' });
}));

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });