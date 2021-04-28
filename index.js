const express = require('express');

const app = express();
const PORT = 3000;
const route = require('./src/Routes/index');

app.use(express.json());
app.use('/', route);
app.use('/users', route);
app.use('/recipes', route);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });