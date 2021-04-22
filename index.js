const path = require('path');
const express = require('express');
const multer = require('multer');
const {
  addUsersController,
  userLoginController,
  addRecipesController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  addPhotoToRecipeController,
} = require('./controllers/usersControllers');
const validateToken = require('./middleware/validateToken');

const router = express.Router();
router.use(express.static(`${__dirname}uploads/`));
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({ storage });

const recipeID = '/recipes/:id';

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
app.get('/recipes', getAllRecipesController);
app.get(recipeID, getRecipeByIdController);
app.put(recipeID, validateToken, updateRecipeByIdController);
app.delete(recipeID, validateToken, deleteRecipeByIdController);
app.put('/recipes/:id/image/',
  [validateToken, upload.single('image')],
  addPhotoToRecipeController);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });