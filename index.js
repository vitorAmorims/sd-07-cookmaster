const express = require('express');

const { logMiddleware, errorMiddleware } = require('./middlewares');
const { user, auth, recipe } = require('./resources');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(logMiddleware);
app.use(user.route);
app.use(auth.route);
app.use(recipe.route);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`CookMaster API ready on ${PORT}!`);
}); 
