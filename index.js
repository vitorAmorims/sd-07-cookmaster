const express = require('express');
const { routersUsers } = require('./src/routers');
const { routersLogin } = require('./src/routers');
const { routersRecipes } = require('./src/routers');

const app = express();
app.use(express.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routersUsers);
app.use('/login', routersLogin);
app.use('/recipes', routersRecipes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });

// referencias
// Zambeli, Cristiano, Igor
// router/index - routerProd/Sale - controllersProd/sales - servideProd/sale - modelsProd
// https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it
// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
// https://expressjs.com/pt-br/guide/routing.html
// https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml