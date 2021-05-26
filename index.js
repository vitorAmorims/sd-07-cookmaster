const express = require('express');
const path = require('path');
const { loginController, recipeController } = require('./controllers');
const newUser = require('./controllers/user');
const {
  validateUsernameEmailPassword,
  validateEmail,
  validateEmailIsUnique,
} = require('./middlewares/validation');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use('/users', validateUsernameEmailPassword,
validateEmail,
validateEmailIsUnique, newUser);
app.use('/login', loginController);
app.use('/recipes', recipeController);
app.use('/images', express.static(path.join(__dirname, '/images')));

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });