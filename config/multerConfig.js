const multer = require('multer');
const { extname, resolve } = require('path');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const { id } = req.params;
        let ext = extname(file.originalname);
        if (ext === '.jpg') ext = '.jpeg';
        const fileName = id;
        cb(null, `${fileName}${ext}`);
        req.imageName = `${fileName}${ext}`;
    },
});

const upload = multer({ storage });

module.exports = {
    upload,
};
