const path = require('path');
const express = require('express');
const {
  addUsersController,
  userLoginController,
  addRecipesController,
} = require('./controllers/usersControllers');
const validateToken = require('./middleware/validateToken');

// const multer = require('multer');

const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// users
app.post('/users', addUsersController);
app.post('/login', userLoginController);
// recipes
app.post('/recipes', validateToken, addRecipesController);

 // daqui pra baixo fica
app.listen(PORT, () => { console.log('API rodando na porta 3000'); });