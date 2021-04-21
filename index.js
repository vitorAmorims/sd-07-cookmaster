require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRoute');
const error = require('./middleware/error');

const app = express();

const { PORT } = process.env;
app.use(express.json());

app.use(userRouter);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(error);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
