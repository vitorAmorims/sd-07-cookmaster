require('dotenv').config();
const express = require('express');
const { userRoute, loginRoute } = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/users', userRoute);
app.use('/login', loginRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send());

app.listen(PORT, () => { console.log(`Online at ${PORT}`); });