const express = require('express');
const multer = require('multer');
const path = require('path');
const middleware = require('./middlewares');
const controller = require('./controllers');
const route = require('./routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ------ uploads ------
app.use('/images', express.static(path.join(__dirname, 'uploads/')));
console.log(path.join(__dirname, 'uploads/'));
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

app.put(
  '/recipes/:id/image',
  middleware.validation.JWT,
  upload.single('image'),
  controller.recipes.addImage,
  middleware.errorHandler,
);
// ------ uploads ------

app.use('/users', route.users);
app.use('/login', route.login);
app.use('/recipes', route.recipes);

const PORT = 3000;

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
