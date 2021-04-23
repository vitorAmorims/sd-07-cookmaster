const express = require('express');
const path = require('path');
const { newLogin, createUser } = require('./controller/user');
const {
  newR,
  list,
  listById,
  edit,
  deleted,
} = require('./controller/recipes');
const { addImage } = require('./model/recipes');
const VJWT = require('./auth');
const upload = require('./multer');

const routerRecipesId = '/recipes/:id';
const router = express.Router();

router.use('/images', express.static(path.join(__dirname, '/uploads')));

router.post('/users', createUser);
router.post('/users/admin', VJWT(true), createUser);
router.post('/login', newLogin);

router.post('/recipes', VJWT(false), newR);
router.get('/recipes', list);
router.get(routerRecipesId, listById);
router.put(routerRecipesId, VJWT(false), edit);
router.delete(routerRecipesId, VJWT(false), deleted);
router.put(
  '/recipes/:id/image',
  VJWT(false),
  upload.single('image'),
  async (req, _res, next) => {
    await addImage(req.params.id);
    console.log('ENTROU');
    next();
  },
  listById,
);

module.exports = router;
