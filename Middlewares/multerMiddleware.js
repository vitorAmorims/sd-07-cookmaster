const multer = require('multer');

const storage = multer.diskStorage({
   destination: (_request, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
},

  });
  
const multerMiddleware = multer({ storage }).single('image');  

module.exports = { multerMiddleware };
