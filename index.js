// Projeto Cookmaster VQV
const express = require('express');

// routers
const userRouter = require('./routes/userRouter');
// const salesRouter = require('./routers/routerSale');

const app = express();
app.use(express.json());

const PORT = 3000;

// rotas
app.use('/', userRouter);
// app.use('/', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// colocar template literals pra esse log e colocar o "PORT"
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
