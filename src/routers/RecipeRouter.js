const express = require('express');
const multer = require('multer');
const RecipeController = require('../controllers/RecipeController');
const middleware = require('../middlewares');
const jwtValidation = require('../auth/jwtValidation');
const authenticationJwt = require('../auth/authenticationJwt');

const router = express.Router();

const storage = middleware.storageMiddleware;
const fileFilter = middleware.fileFilterMiddleware;
const upload = multer({ fileFilter, storage });

router.post('/', jwtValidation, middleware.recipeMiddleware,
RecipeController.create);

router.post('/:id/image', middleware.idExistMiddleware,
jwtValidation, authenticationJwt, upload.single('image'), RecipeController.createImage);

router.get('/', RecipeController.findAll);

router.use('/images', express.static(`${__dirname}/../../uploads/`));

router.get('/:id', middleware.idExistMiddleware, RecipeController.findById);

router.put('/:id', middleware.idExistMiddleware,
jwtValidation, authenticationJwt, RecipeController.update);

router.delete('/:id', middleware.idExistMiddleware,
jwtValidation, authenticationJwt, RecipeController.exclude);

router.use(middleware.errorMiddleware);

module.exports = router;
