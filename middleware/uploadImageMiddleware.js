const multer = require('multer');
const CODES = require('../configurations/statusCodes');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'images/');
   },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, callback) => {
    const filetypes = /jpeg/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return callback(null, true);
    } 
      callback({ statusCode: CODES.FORBIDDEN, message: 'Extension must be `jpeg`' });
  },
});

const uploadImageMiddleware = upload.single('image');

module.exports = uploadImageMiddleware;
