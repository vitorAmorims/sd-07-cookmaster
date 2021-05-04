const express = require('express');
const verifyAuthorization = require('./middlewares/verifyAuthorization');
const userRouter = require('./router/userRouter');
const loginRouter = require('./router/loginRouter');
const recipesRouter = require('./router/recipesRouter');

const app = express();

const PORT = 3000;

// const middlewares = require('./middlewares');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });