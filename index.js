const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRoutes = require('./routes/userRoutes');

const PORT = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API @ PORT 3000'); });

app.use('/users', userRoutes);