const express = require('express');
const path = require('path');
const status = require('./src/helpers/httpStatus');

const routes = require('./src/routes');

const app = express();

app.use(express.json());

const PORT = 3000;

app.get('/images/:id', (req, res) => {
  const { id } = req.params;
  res.status(status.OK).sendFile(path.join(__dirname, `../../uploads/${id}`));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(routes);

app.listen(PORT, () => { console.log('API rodando na porta 3000'); });
