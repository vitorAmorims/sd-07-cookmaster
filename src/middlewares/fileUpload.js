const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const fileFilter = (req, file, callback) => {
    const path = req.get('host');
    const { id } = req.params;
    req.pathImage = `${path}/images/${id}.jpeg`;
    callback(null, true);
};

module.exports = multer({ storage, fileFilter });
