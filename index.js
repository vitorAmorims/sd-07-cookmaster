const express = require('express');
const routers = require('./routers');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(routers.usersRouters);
app.use(routers.loginRouter);
app.use(routers.recipesRouters);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
