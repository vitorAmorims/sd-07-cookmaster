const express = require('express');
require('express-async-errors');

const routes = require('./src/routes');

const uploadConfig = require('./src/config/upload');
const errorHandling = require('./src/middlewares/errorHandling');
const { auditInitialRequest } = require('./src/utils/audit'); 

const app = express();
const port = 3000;

app.use(express.json());

app.use('/images', express.static(uploadConfig.directory));

app.use(auditInitialRequest);

app.get('/', (_req, res) => {
  res.send();
});

app.use(routes);

app.use(errorHandling);

app.listen(port, () => console.log(`Store Manager Server listening on port ${port}!`));