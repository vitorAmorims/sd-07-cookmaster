const { Router } = require('express');
const { body } = require('express-validator');

const userControllers = require('../controllers/userControllers');

const router = Router();
// const middlewares = require('../middlewares');
// const helpers = require('../helpers');

router.post('/', 
body('email').isEmail(), 
body('name').notEmpty(), 
body('password').isLength({ min: 5 }), userControllers);

module.exports = router;
