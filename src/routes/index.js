const { Router } = require('express');

const usersRoutes = require('./usersRoutes');
const loginRoutes = require('./loginRoutes');
const recipesRoutes = require('./recipesRoutes');
const handleError = require('../middlewares/errorMiddleware');

const appRoutes = Router();

appRoutes.use('/users', usersRoutes);
appRoutes.use('/login', loginRoutes);
appRoutes.use('/recipes', recipesRoutes);
appRoutes.use(handleError.errorMiddleware);

module.exports = appRoutes;