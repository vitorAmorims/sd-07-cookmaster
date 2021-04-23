// https://github.com/tryber/sd-07-cookmaster/pull/4/files
// problema solucionado pelo Marcelo Ivan.

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
   },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const uploadMiddleware = upload.single('image');

module.exports = uploadMiddleware;