const multer = require('multer');

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, `${__dirname}../../../uploads`);
    },
    filename: (req, _file, callback) => {
        const { id } = req.params;
        callback(null, `${id}.jpeg`);
    },

});

const update = multer({ storage });

module.exports = update;
