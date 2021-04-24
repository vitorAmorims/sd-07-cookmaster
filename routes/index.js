const express = require('express');

const photosController = require('../controllers/photosController');
const photosMiddleware = require('../middlewares/photosMiddleware');

const usersController = require('../controllers/usersController');

const { checkUserRequiredFields, checkIfExists,
  checkLoginRequiredFields } = require('../middlewares/usersMiddleware');

const usersMiddlewares = [checkUserRequiredFields, checkIfExists];

/* const usersMiddleware = require('../middlewares/usersMiddleware'); */

/* const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController'); */

const router = express.Router();
router.use(express.static(`${__dirname}uploads/`));

router.post('/photos', photosMiddleware.upload, photosController.sendPhotos);

router.post('/users', usersMiddlewares, usersController.createUser);

router.post('/login', checkLoginRequiredFields, usersController.signIn);

/* router.get('/users', usersController.findUserByEmail); */

/* router.get('/recipes', ''); */

module.exports = router;
