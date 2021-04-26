const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const isEndWithJpeg = (filename) => filename.endsWith('.jpg');

const fileFilter = (req, file, callback) => {
  const fileName = file.originalname;
  if (isEndWithJpeg(fileName)) {
    const path = req.get('host');
    const { id } = req.params;
    req.pathImage = `${path}/images/${id}.jpeg`;
    callback(null, true);
  } else {
    req.fileValidationError = 'Extension must be `jpg`';
    callback(null, false, req);
  }
};

module.exports = multer({ storage, fileFilter });
