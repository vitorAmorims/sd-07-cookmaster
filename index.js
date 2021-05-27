require('dotenv').config();
const path = require('path');
const express = require('express');
const { userRoute, loginRoute, recipeRoute } = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/recipes', recipeRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send());

app.listen(PORT, () => { console.log(`Online at ${PORT}`); });