const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const users = require('./controllers/user');
const login = require('./controllers/login');
const recipes = require('./controllers/recipes');
const validateJWT = require('./api/auth/validateJWT');

const app = express();
const port = 3000;
const pathId = '/recipes/:id';

const uploads = path.resolve(__dirname, 'uploads');

const storage = multer.diskStorage({
  destination: uploads,
  filename: (req, _file, callback) => {
    const { id } = req.params;
    const filename = `${id}.jpeg`;
    callback(null, filename);
  },
});

const upload = multer({ storage });

app.use('/images', express.static(`${__dirname}/uploads`));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', users.registerUser);
app.post('/login', login.loginUser);
app.get('/recipes', recipes.getRecipes);
app.get(pathId, recipes.getRecipeById);

app.use(validateJWT);
app.post('/recipes', recipes.createRecipe);
app.put(pathId, recipes.updateRecipe);
app.delete(pathId, recipes.deleteRecipe);
app.put('/recipes/:id/image/', upload.single('image'), recipes.insertImage);

app.listen(port, () => console.log('Listening on port 3000'));