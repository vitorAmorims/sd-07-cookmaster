const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${req.params.id}.jpeg`);
    },
});

const upload = multer({ storage });

module.exports = { 
    upload,
};