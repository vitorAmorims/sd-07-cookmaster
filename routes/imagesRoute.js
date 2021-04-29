const express = require('express');
const multer = require('multer');
const path = require('path');
const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();
const imagesPath = path.join(__dirname, 'uploads/');

router.use(express.static(imagesPath));

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        const { id } = req.params;
        const nameFile = `${id}.jpeg`;
        callback(null, nameFile);
    },
});

const upload = multer({ storage });

// #9 endpoint para a adição de uma imagem a uma receita
router.put('/recipes/:id/image/',
  middlewares.validateToken,
  middlewares.loggedInMiddleware,
  upload.single('image'),
  recipesController.addImageRecipe);
  
module.exports = router;
