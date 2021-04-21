const { Router } = require('express');
const controllersUsers = require('../controllers/controllersUsers');

const routersUsers = Router();

routersUsers.post('/', controllersUsers.createNewUser);

routersUsers.get('/', controllersUsers.getAll);
// routersUsers.get('/:id', controllersUsers.getById);

// routersUsers.put('/:id', controllersUsers.updateById);
// routersUsers.delete('/:id', controllersUsers.excludeById);

module.exports = routersUsers;
