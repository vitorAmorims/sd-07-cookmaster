const express = require('express');
// const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();

// router.post('/products',

router.use(middlewares.errorMiddleware);

module.exports = router;