const express = require('express');
const userRoutes = require('./Routes/user');
const loginRoutes = require('./Routes/login');
const recipeRoutes = require('./Routes/recipe');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send();
});

app.use(userRoutes);
app.use(loginRoutes);
app.use(recipeRoutes);

app.listen(port, () => console.log(`CookMaster Server listening on port ${port}!`));