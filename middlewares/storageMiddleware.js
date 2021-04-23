const multer = require('multer');

const storageMiddleware = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

module.exports = storageMiddleware;
