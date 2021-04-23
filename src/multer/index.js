const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_res, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;