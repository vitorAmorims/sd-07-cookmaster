const { Router } = require('express');
// const { body } = require('express-validator');
//  const verifyAuthorization = require('../middlewares/verifyAuthorization');
// const verifyOwnerReciperOrAdmin = require('../middlewares/verifyOwnerReciperOrAdmin');
const multer = require('multer');
const recipesControllers = require('../controllers/recipesControllers');

const router = Router();
 const { verifyAuthorization } = require('../middlewares');
// const helpers = require('../helpers');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${req.params.id}.jpeg`);
      },
});
const upload = multer({ storage });

router.get('/', recipesControllers.getAll);

router.get('/:id', recipesControllers.findByid);

router.put('/:id', 
verifyAuthorization, recipesControllers.updateRecipes);

router.put('/:id/image', 
verifyAuthorization, upload.single('image'), recipesControllers.editUpload);

router.post('/', verifyAuthorization, recipesControllers.recipes);

router.delete('/:id', verifyAuthorization, recipesControllers.deleteRecipes);

module.exports = router;