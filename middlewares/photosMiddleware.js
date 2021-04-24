const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (_request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage }).array('file', 3);

module.exports = {
  upload,
};
