const multer = require('multer');
const { extname, resolve } = require('path');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, resolve(__dirname, '..', 'uploads'));
    },
    filename: (_req, file, cb) => {
        const ext = extname(file.originalname);
        const fileName = file.originalname.substring(
            file.originalname.lastIndexOf('.', -1),
            );
        cb(null, `${fileName}.${ext}`);
    },
});

const upload = multer({ storage });

module.exports = {
    upload,
};
