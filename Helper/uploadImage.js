// Feito em pair-programming no plantão com Thadeu Castelo Branco
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
      callback(null, 'images/');
  },
  filename: (req, _file, callback) => {
      const { id } = req.params;
      callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const uploadImage = upload.single('image');

module.exports = uploadImage;
