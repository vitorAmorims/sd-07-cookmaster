const express = require('express');
const path = require('path');
/*
const middleware = require('./middlewares');
const service = require('./service');
const controller = require('./controllers');
*/
const route = require('./routes');

const UPLOADS = path.join(__dirname, 'uploads/');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
/*
app.put(
  '/recipes/:id/image',
    middleware.validation.JWT,
    service.multer('image'),
    controller.recipes.addImage,
    middleware.errorHandler,
);
*/
app.use('/users', route.users);
app.use('/login', route.login);
app.use('/images', express.static(UPLOADS));
app.use('/recipes', route.recipes);

const PORT = 3000;

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
