const { Router } = require('express');
const { body } = require('express-validator');

const loginControllers = require('../controllers/loginControllers');

const router = Router();
// const middlewares = require('../middlewares');
// const helpers = require('../helpers');

router.post('/', 
body('email').isEmail(),
body('password').isLength({ min: 5 }), loginControllers);

module.exports = router;
