const express = require('express');
const rescue = require('express-rescue');
const path = require('path');
const jwt = require('jsonwebtoken');

const status = require('./httpStatusCodes');
const MissingTokenError = require('./errors/MissingTokenError');
const ForbiddenError = require('./errors/ForbiddenError');

const usersRoute = require('./routes/usersRoute');
const recipesRoute = require('./routes/recipesRoute');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', usersRoute);

app.use('/', recipesRoute);

app.use(rescue.from(MissingTokenError, (err, _req, res, _next) => {
  res.status(status.UNAUTHORIZED).json({ message: err.message });
}));

app.use(rescue.from(jwt.JsonWebTokenError, (err, _req, res, _next) => {
  res.status(status.UNAUTHORIZED).json({ message: err.message });
}));

app.use(rescue.from(ForbiddenError, (err, _req, res, _next) => {
  res.status(status.FORBIDDEN).json({ message: err.message });
}));

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });