const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, file, cb);
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname, 'recipeImages/');
    },
});

const upload = multer({ storage });

module.exports = {
    upload,
};
