const { Router } = require('express');
const controllersLogin = require('../controllers/controllersLogin');
// const servicesLogin = require('../services/servicesLogin');
// const servicesUsers = require('../services/servicesUsers');

const routersLogin = Router();

routersLogin.post('/', controllersLogin.createNewLogin);

// routersLogin.get('/', controllersLogin.getAll);
// routersLogin.get('/:id', controllersLogin.getById);

// routersLogin.put('/:id', controllersLogin.updateById);
// routersLogin.delete('/:id', controllersLogin.excludeById);

module.exports = routersLogin;
