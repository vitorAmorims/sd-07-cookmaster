const express = require('express');
const path = require('path');

const userRouter = require('./routes/userRoutes');
const loginRouter = require('./routes/loginRoutes');
const recipeRouter = require('./routes/recipeRoutes');

const app = express();
app.use(express.json());

app.use('/images', express.static(path.resolve(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(userRouter);
app.use(loginRouter);
app.use(recipeRouter);

app.use((err, _req, res, _next) => {
  res.status(err.status).json({ message: err.message });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
