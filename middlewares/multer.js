const multer = require('multer');

module.exports = () => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
    } });
  
  const upload = multer({ storage });
  return upload.single('image');
};