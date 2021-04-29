const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

const validateJWT = require('./auth/validateJWT');
const User = require('./controller/user');
const Recipe = require('./controller/recipe');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });
const RECIPE_ID = '/recipes/:id';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', User.addUser);
app.post('/login', User.login);

app.post('/recipes', validateJWT, Recipe.addRecipe);
app.get('/recipes', Recipe.getRecipes);
app.get(RECIPE_ID, Recipe.getRecipeById);
app.put(RECIPE_ID, validateJWT, Recipe.editRecipeById);
app.delete(RECIPE_ID, validateJWT, Recipe.deleteRecipeById);
app.put(
  '/recipes/:id/image',
  validateJWT,
  upload.single('image'),
  Recipe.uploadRecipeImage,
);
app.get('/images/:file', Recipe.getImageFile);

app.listen(PORT, () => {
  console.log('API rodando na porta 3000');
});
