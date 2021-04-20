const express = require('express');
const path = require('path');

const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(routes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
