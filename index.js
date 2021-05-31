const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const tokenValidation = require('./auth/tokenValidation');
const isAdmin = require('./auth/isAdmin');
const UsersController = require('./controllers/UsersController');
const RecipesController = require('./controllers/RecipesController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const recipeID = '/recipes/:id';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', UsersController.create);

app.post('/login', UsersController.login);

app.post('/recipes', tokenValidation, RecipesController.create);
app.get('/recipes', RecipesController.getAll);

app.get(recipeID, RecipesController.findById);
app.put(recipeID, tokenValidation, RecipesController.updateById);
app.delete(recipeID, tokenValidation, RecipesController.deleteById);

// router.get('/images/:id', RecipesController.showImages);

app.use(express.static(path.join(__dirname, '/uploads')));

app.use('/images', express.static(path.join(__dirname, '/uploads')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const images = multer({ storage });

app.put('/recipes/:id/image/',
  tokenValidation,
  images.single('image'),
  RecipesController.updateImageById);

app.post('/users/admin', tokenValidation, isAdmin, UsersController.createAdmin);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
