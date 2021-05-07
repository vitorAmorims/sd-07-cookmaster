const { Router } = require('express');
// const { body } = require('express-validator');
//  const verifyAuthorization = require('../middlewares/verifyAuthorization');
// const verifyOwnerReciperOrAdmin = require('../middlewares/verifyOwnerReciperOrAdmin');

const recipesControllers = require('../controllers/recipesControllers');

const router = Router();
 const { verifyAuthorization } = require('../middlewares');
// const helpers = require('../helpers');

router.get('/', recipesControllers.getAll);

router.get('/:id', recipesControllers.findByid);

router.put('/:id', 
verifyAuthorization, recipesControllers.updateRecipes);

router.post('/', verifyAuthorization, recipesControllers.recipes);

router.delete('/:id', verifyAuthorization, recipesControllers.deleteRecipes);

module.exports = router;