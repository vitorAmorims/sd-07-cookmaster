const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
  // next();
});

const upload = multer({ storage });

// const uploadMulter = async (req, res, next) => {
//   return upload.single('image')(req, res, () => {
//     if (!req.file) return res.json({ error: ErrorMessages.invalidFiletype })
//     next();
//   });
// };

module.exports = { upload };
