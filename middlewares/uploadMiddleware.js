const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'images/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const isAccepted = ['image/gif', 'image/jpg', 'image/jpeg'].find(
      (formatoAceito) => formatoAceito === file.mimetype,
    );
    req.exist = true;
    if (isAccepted) {
      callback(null, true);
    }
    callback(null, false);
  },
});
const uploadMiddleware = upload.single('arquivo');

module.exports = uploadMiddleware;
