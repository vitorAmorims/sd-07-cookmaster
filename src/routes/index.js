const { Router } = require('express');

const usersRoutes = require('./usersRoutes');
const loginRoutes = require('./loginRoutes');
const handleError = require('../middlewares/errorMiddleware');

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);
appRoutes.use('/login', loginRoutes);
appRoutes.use(handleError.errorMiddleware);

module.exports = appRoutes;