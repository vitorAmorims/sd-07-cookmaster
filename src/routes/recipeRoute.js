const express = require('express');
const { validationMiddleware, authMiddleware } = require('../middlewares');
const { recipeController } = require('../controller');

const router = express.Router();

router.use(express.json());

const BASE_URL = '/recipes';

router.post(BASE_URL,
            authMiddleware.validateToken,
            validationMiddleware.validateRecipe,
            recipeController.createRecipe);

router.get(BASE_URL, recipeController.getRecipes);

router.get(`${BASE_URL}/:id`, validationMiddleware.isRecipeExists, recipeController.getRecipeById);

router.put(`${BASE_URL}/:id`, authMiddleware.validateTokenUpdating, recipeController.updateRecipe);

router.delete(`${BASE_URL}/:id`,
              authMiddleware.validateTokenUpdating,
              recipeController.deleteRecipe);

// router.use(express.static(__dirname + "uploads/"))

// const storage = multer.diskStorage({
//  destination: (req, file, callback) => {
//    console.log('multer dest')
//    callback(null, 'uploads/');
//   },
//   filename: (req, file, callback) => {
//     console.log('multer')
//     callback(null, req.params.id + '.jpeg')
//   }
// })

// const upload = multer( { storage })

router.put(`${BASE_URL}/:id/image`,
            authMiddleware.validateTokenUpdating,
            recipeController.uploadPhoto);

router.get('/images/:id', recipeController.getPhoto);

module.exports = router;