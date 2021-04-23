const express = require('express');
const usersController = require('../controllers/usersController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/products',


router.use(middlewares.errorMiddleware);

module.exports = router;