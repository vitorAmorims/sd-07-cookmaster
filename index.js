const express = require('express');
const users = require('./controllers/users');
const recipes = require('./controllers/recipes');

const app = express();

app.get('/', (request, response) => response.send());

app.use(express.json());
app.use(users);
app.use(recipes);
app.use('/images', express.static(`${__dirname}/images`));

const PORT = 3000;
app.listen(PORT, () => { console.log(`Running on port: ${PORT}`); });
