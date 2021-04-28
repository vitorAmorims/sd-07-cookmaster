const express = require('express');
const path = require('path');
const middlewares = require('./middlewares');
const userRoute = require('./routes/userRoute');
const recipeRoute = require('./routes/recipeRoute');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(userRoute);
app.use(recipeRoute);

app.use(middlewares.errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });