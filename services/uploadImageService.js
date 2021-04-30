const multer = require('multer');

const image = multer.diskStorage({
    destination: (_req, _file, call) => {
        call(null, 'uploads');
    },
    filename: (rewq, _file, call) => {
        const { id } = req.params;
        call(null, `${id}.jpeg`);
    },
});

const uploadImage = multer({ image }).single('image');

module.exports = { uploadImage };
