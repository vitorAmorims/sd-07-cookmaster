const express = require('express');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(routes);

app.listen(3000, () => console.log('Server running at port 3000'));
