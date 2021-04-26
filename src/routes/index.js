const { Router } = require('express');

const usersRoutes = require('./usersRoutes');
const handleError = require('../middlewares/errorMiddleware');

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);
appRoutes.use(handleError.errorMiddleware);

module.exports = appRoutes;