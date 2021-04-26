const multer = require('multer');

const storageMiddleware = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },

  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.${file.mimetype.split('/')[1]}`);
  },
});

module.exports = storageMiddleware;
