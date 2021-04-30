const multer = require('multer');

const saved = multer.diskStorage({
    destination: '../uploads',
    filename: (req, _file, call) => {
        const { id } = req.params;
        call(null, `${id}.jpeg`);
    },
  });
  
const multerMiddleware = multer({ saved }).single('image');  

module.exports = { multerMiddleware };
