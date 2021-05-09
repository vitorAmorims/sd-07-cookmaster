const express = require('express');
const multer = require('multer');

const router = express.Router();
router.use(express.static(`${__dirname}uploads/`));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/images', upload.array('file', 3), (req, res) => {
  try {
    res.status(200).json({ message: 'Imagem(s) salva(s) com sucesso!' });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao enviar a(s) imagem(s)',
      error: error.message,
    });
  }
});

module.exports = router;
