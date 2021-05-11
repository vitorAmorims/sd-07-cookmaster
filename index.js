const express = require('express');
const multer = require('multer');
const path = require('path');

const userControllers = require('./src/controllers/userControllers');
const recipeControllers = require('./src/controllers/recipeControllers');
const errorTreat = require('./src/middlewares/errorTreat');

const app = express();
const recipeId = '/recipes/:id';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`),
});
const upload = multer({ storage });

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', userControllers.newUser, errorTreat);
app.post('/users/admin', userControllers.newAdmin);
app.post('/login', userControllers.getUserByEmail, errorTreat);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.get('/recipes', recipeControllers.getAllRecipes);
app.post('/recipes', recipeControllers.newRecipe, errorTreat);
app.get(recipeId, recipeControllers.getRecipeById);
app.put(recipeId, recipeControllers.editRecipe);
app.delete(recipeId, recipeControllers.deleteRecipe);
app.put('/recipes/:id/image', upload.single('image'), recipeControllers.addImage);

app.listen(3000, () => console.log('Online'));
