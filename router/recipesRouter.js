const { Router } = require('express');
// const { body } = require('express-validator');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const recipesControllers = require('../controllers/recipesControllers');

const router = Router();
// const middlewares = require('../middlewares');
// const helpers = require('../helpers');

router.post('/', verifyAuthorization, recipesControllers);

module.exports = router;