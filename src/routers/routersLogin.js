const { Router } = require('express');
const controllersLogin = require('../controllers/controllersLogin');

const routersLogin = Router();

// routersLogin.post('/', controllersLogin.createNewLogin);

// routersLogin.get('/', controllersLogin.getAll);
// routersLogin.get('/:id', controllersLogin.getById);

// routersLogin.put('/:id', controllersLogin.updateById);
// routersLogin.delete('/:id', controllersLogin.excludeById);

module.exports = routersLogin;
