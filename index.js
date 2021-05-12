const express = require('express');
const path = require('path');
const { usersRouter, loginRouter, recipesRouter } = require('./src/Routers');

const app = express();
app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });

// referencias
// Andersson Struber, Zambeli, Cristiano, Igor
// router/index - routerProd/Sale - controllersProd/sales - servideProd/sale - modelsProd
// https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it
// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
// https://expressjs.com/pt-br/guide/routing.html
// https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
// https://stackoverflow.com/questions/49831049/use-multer-file-upload-within-a-separate-controller-function
// YOUTUBE = milhares de videos
