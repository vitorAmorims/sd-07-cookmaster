const express = require('express');
const path = require('path');
const { userRoute, loginRoute, recipeRoute } = require('./controllers');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
// /images é o caminho da API onde as imagens estarão disponíveis
// path.join(__dirname, 'uploads') é o caminho da pasta onde o multer salva suas imagens ao realizar o upload
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRoute);

app.use('/login', loginRoute);

app.use('/recipes', recipeRoute);

app.use(errorMiddleware);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });