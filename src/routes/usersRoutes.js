const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/users', usersController.createUser);
router.post('/login', usersController.login);

/* router.use(express.static(`${__dirname}/uploads/`));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/users', upload.array, (req, res) => {
  try {
    res.status(200).json({ message: 'Usuários enviados com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}) */

module.exports = router;