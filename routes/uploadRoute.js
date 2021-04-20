const express = require('express');
const multer = require('multer');

const router = express.Router();

router.use(express.static(`${__dirname}/uploads`));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });
router.post('/upload', upload.array('file', 3), (req, res) => {
  try {
    res.status(200).json({ message: 'imagens enviadas com sucesso' });
  } catch (error) {
    res.status(500).json({});
  }
});

module.exports = router;