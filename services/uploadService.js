const multer = require('multer');

module.exports = () => {
  const storage = multer.diskStorage({
    destination: (_request, _file, callback) => {
      callback(null, 'uploads');
    },
    filename: (request, _file, callback) => callback(null, `${request.params.id}.jpeg`),
  });
  const upload = multer({ storage });
  return upload.single('image');
};