const { Router } = require('express');
const controllersRecipes = require('../controllers/controllersRecipes');
const { verifyToken } = require('../middlewares/token');

const routersRecipes = Router();

routersRecipes.post('/', verifyToken, controllersRecipes.createNewRecipe);

routersRecipes.get('/', controllersRecipes.getAll);
routersRecipes.get('/:id', controllersRecipes.getById);

routersRecipes.put('/:id', verifyToken, controllersRecipes.updateById);
routersRecipes.delete('/:id', verifyToken, controllersRecipes.excludeById);

// routersRecipes.put('/:id/image', verifyToken, controllersRecipes.updateImg);

module.exports = routersRecipes;
