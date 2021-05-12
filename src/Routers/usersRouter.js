const { Router } = require('express');
const { validateAdministrator } = require('../Authentication/validateAdministrator');
const { 
  userCreated,
  getAllUser,
  adminCreated } = require('../Controllers/usersController');
const {
  validateUser,
  validateUniqueEmail,
} = require('../Services/usersService');

const usersRouter = Router();

usersRouter.post(
  '/',
  validateUser,
  validateUniqueEmail,
  userCreated,
);

usersRouter.get('/', getAllUser);

usersRouter.post(
  '/admin',
  validateAdministrator,
  validateUser,
  validateUniqueEmail,
  adminCreated,
);

// usersRouter.get('/:id', usersController.getById);
// usersRouter.put('/:id', usersController.updateById);
// usersRouter.delete('/:id', usersController.excludeById);

module.exports = usersRouter;
