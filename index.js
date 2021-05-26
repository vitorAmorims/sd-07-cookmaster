const express = require('express');
const bodyParser = require('body-parser');

const tokenValidation = require('./auth/tokenValidation');
const isAdmin = require('./auth/isAdmin');
const UsersController = require('./controllers/UsersController');
const RecipesController = require('./controllers/RecipesController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', UsersController.create);

app.post('/login', UsersController.login);

app.route('/recipes')
  .post(tokenValidation, RecipesController.create)
  .get(RecipesController.getAll);

app.route('/recipes/:id')
  .get(RecipesController.findById)
  .put(tokenValidation, RecipesController.updateById)
  .delete(tokenValidation, RecipesController.deleteById);

// app.get('/images/:id', RecipesController.showImages);

// app.put('/recipes/:id/image/', RecipesController.updateImageById);

app.post('/users/admin', tokenValidation, isAdmin, UsersController.createAdmin);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
