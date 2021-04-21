const express = require('express');
const { routersUsers } = require('./src/routers');

const app = express();
app.use(express.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', routersUsers);
// app.use('/login', routersLogin);
// app.use('/sales', routersRecipes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });

// referencias
// 
// router/index - routerProd/Sale - controllersProd/sales - servideProd/sale - modelsProd
// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
// https://expressjs.com/pt-br/guide/routing.html
// https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml