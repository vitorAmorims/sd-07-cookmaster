const express = require('express');
const bodyParser = require('body-parser');
const errMiddleware = require('./middlewares/errMiddleware');

const app = express();
const { loginRoute, userRoutes } = require('./routes');

const PORT = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('API @ PORT 3000'); });

app.use('/users', userRoutes);
app.use('/login', loginRoute);

app.use(errMiddleware);