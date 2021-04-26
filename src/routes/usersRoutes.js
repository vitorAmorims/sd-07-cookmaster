const { Router } = require('express');

const usersRoutes = Router();
const UsersController = require('../controllers/UsersController');

usersRoutes.post('/', UsersController.create);
usersRoutes.get('/', UsersController.readAllUsers);

module.exports = usersRoutes;